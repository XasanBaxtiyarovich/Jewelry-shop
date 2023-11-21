import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Admin } from './entities/admin.entity';
import { MailService } from '../mail/mail.service';
import { SignInDto, SignUpDto, UpdateDateDto, UpdatePasswordDto } from './dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)private adminsRepository: Repository<Admin>, 
    private jwtService: JwtService,
    private mailService: MailService
  ){}

  async signUP(signUpDto: SignUpDto, res: Response): Promise<Object | HttpStatus>  {
    const [delete_admin] = await this.adminsRepository.findBy(
      {
        mail: signUpDto.mail,
        is_active: false
      }
    );
    if(delete_admin) await this.adminsRepository.delete({mail: signUpDto.mail, is_active: false});

    const [conflictAdmin] = await this.adminsRepository.findBy({mail: signUpDto.mail});
    if(conflictAdmin) return HttpStatus.CONFLICT;

    const link: string = v4();
    const hashed_password = await bcrypt.hash(signUpDto.password, 7);
    
    const new_admin = await this.adminsRepository.save({ ...signUpDto, hashed_password: hashed_password, activation_link: link });
    
    const tokens = await this.getTokens(new_admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    await this.adminsRepository.update({id: new_admin.id}, {hashed_refresh_token: hashed_refresh_token })
    const [admin] = await this.adminsRepository.findBy({id: new_admin.id}); 

    res.cookie('refresh_token', tokens.refresh_token, 
      {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true
      }
    );

    try {
      await this.mailService.sendUserConfirmation('admin', admin.activation_link, admin.mail, admin.first_name);
    } catch (error) {
      console.log(error)
    }

    return {message: 'Sign up successfully', admin: admin, tokens};
  }

  async signIN(signInDto: SignInDto, res: Response): Promise<Object | HttpStatus> {
    const [admin] = await this.adminsRepository.findBy({mail: signInDto.mail});
    if(!admin) return HttpStatus.NOT_FOUND;

    if(!admin.is_active) return HttpStatus.FORBIDDEN;

    const pass = await bcrypt.compare(signInDto.password, admin.hashed_password);
    if(!pass) return HttpStatus.NOT_FOUND;

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    await this.adminsRepository.update({ id: admin.id }, { hashed_refresh_token });
    const signIN_admin = await this.adminsRepository.findBy({ id: admin.id });

    res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});

    const response = {message: 'Sign in succesfully', admin: signIN_admin, tokens}

    return response;
  }

  async signOUT(refreshToken: string, res: Response): Promise<boolean | HttpStatus> {
    const admin = await this.jwtService.verify(refreshToken, {secret: process.env.REFRESH_TOKEN_KEY_ADMIN || 'MyAccesVery1'});
    if(!admin) return HttpStatus.NOT_FOUND;

    await this.adminsRepository.update({id: admin.id}, {hashed_refresh_token: null});

    res.clearCookie('refresh_token');

    return true;
  }

  async activate(link: string): Promise<Object | HttpStatus>  {
      if(!link) return HttpStatus.NOT_FOUND;

      await this.adminsRepository.update(
        {
          activation_link: link,
          is_active: false
        }, 
        {
          is_active: true
        }
      )

      const [admin] = await this.adminsRepository.findBy({ activation_link: link , is_active: true});
      if(!admin) return HttpStatus.FORBIDDEN;

      const response = { message: 'Admin active successfully', admin};

      return response;
  }  

  async refreshTOKEN(admin_id: number, refreshToken: string, res: Response): Promise<Object | HttpStatus> {
    const decodedToken = this.jwtService.decode(refreshToken);
    if(admin_id != decodedToken['id']) return HttpStatus.NOT_FOUND;

    const admin = await this.adminsRepository.findOne({ where: {id: admin_id }});
    if(!admin || !admin.hashed_refresh_token) return HttpStatus.NOT_FOUND;

    const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_refresh_token);
    if(!tokenMatch) return HttpStatus.FORBIDDEN;

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token  = await bcrypt.hash(tokens.refresh_token, 7);

    await this.adminsRepository.update({id: admin.id}, {hashed_refresh_token});
    const updateAdmin = await this.adminsRepository.findBy({ id: admin.id });

    res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});

    const response = {message: 'refreshed token successfully', admin: updateAdmin, tokens};

    return response;
  }

  async findADMINS(): Promise<Admin[] | HttpStatus> {
    const admins = await this.adminsRepository.find();

    if (admins.length === 0) return HttpStatus.NOT_FOUND;

    return admins;
  }

  async findADMIN(id: number): Promise<Admin | HttpStatus> {
    const [admin] = await this.adminsRepository.findBy({ id });

    if (!admin) return HttpStatus.NOT_FOUND;

    return admin;
  }

  async updateDATE(id: number, updateDateDto: UpdateDateDto): Promise<Admin | HttpStatus> {
    const [admin] = await this.adminsRepository.findBy({ id });
    if (!admin)  return HttpStatus.NOT_FOUND;
    
    await this.adminsRepository.update({ id }, {...updateDateDto});
    const [updateAdmin] = await this.adminsRepository.findBy({id});

    return updateAdmin;
  }

  async updatePASSWORD(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Admin | HttpStatus>  {
    const [admin] = await this.adminsRepository.findBy({ id });
    if (!admin) return HttpStatus.NOT_FOUND;

    const pass = await bcrypt.compare(updatePasswordDto.password, admin.hashed_password);
    if (!pass) return HttpStatus.CONFLICT;

    if (updatePasswordDto.new_password != updatePasswordDto.confirm_password) return HttpStatus.UNAUTHORIZED;

    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.adminsRepository.update({id}, {hashed_password});

    const [updatePasswordAdmin] = await this.adminsRepository.findBy({ id });

    return updatePasswordAdmin;
  }

  async removeADMIN(id: number): Promise<HttpStatus> {
    const [removeAdmin] = await this.adminsRepository.findBy({id});

    if(!removeAdmin) return HttpStatus.NOT_FOUND;

    await this.adminsRepository.delete( {id} );

    return HttpStatus.OK;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = { id: admin.id, is_active: admin.is_active, is_super: admin.is_super }
  
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCES_TOKEN_KEY_ADMIN || 'MyAccesVery',
        expiresIn: process.env.ACCESS_TOKEN_TIME || '24h'
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN || 'MyAccesVery1',
        expiresIn: process.env.REFRESH_TOKEN_TIME || '24d'
      })
    ]);
    
    return {access_token: accessToken, refresh_token: refreshToken};
  }
}