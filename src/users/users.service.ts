import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { MailService } from '../mail/mail.service';
import { SignInDto, SignUpDto, UpdateDateDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)private userRepository: Repository<User>, 
    private jwtService: JwtService,
    private mailService: MailService
  ){}

  async signUP(signUpDto: SignUpDto, res: Response): Promise<Object | HttpStatus>  {
    const [delete_user] = await this.userRepository.findBy(
      {
        mail: signUpDto.mail,
        is_active: false
      }
    );
    if(delete_user) await this.userRepository.delete({mail: signUpDto.mail, is_active: false});

    const [conflictUser] = await this.userRepository.findBy({mail: signUpDto.mail});
    if(conflictUser) return HttpStatus.CONFLICT;

    const link: string = v4();
    const hashed_password = await bcrypt.hash(signUpDto.password, 7);
    
    const new_user = await this.userRepository.save({ ...signUpDto, hashed_password: hashed_password, activation_link: link });
    
    const tokens = await this.getTokens(new_user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    await this.userRepository.update({id: new_user.id}, {hashed_refresh_token: hashed_refresh_token })
    const [user] = await this.userRepository.findBy({id: new_user.id}); 

    res.cookie('refresh_token', tokens.refresh_token, 
      {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true
      }
    );

    try {
      await this.mailService.sendUserConfirmation('user', user.activation_link, user.mail, user.first_name);
    } catch (error) {
      console.log(error)
    }

    return {message: 'Sign up successfully', user: user, tokens};
  }

  async signIN(signInDto: SignInDto, res: Response): Promise<Object | HttpStatus> {
    const [user] = await this.userRepository.findBy({mail: signInDto.mail});
    if(!user) return HttpStatus.NOT_FOUND;

    if(!user.is_active) return HttpStatus.FORBIDDEN;

    const pass = await bcrypt.compare(signInDto.password, user.hashed_password);
    if(!pass) return HttpStatus.NOT_FOUND;

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    await this.userRepository.update({ id: user.id }, { hashed_refresh_token });
    const signIN_user = await this.userRepository.findBy({ id: user.id });

    res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});

    const response = {message: 'Sign in succesfully', user: signIN_user, tokens}

    return response;
  }

  async signOUT(refreshToken: string, res: Response): Promise<boolean | HttpStatus> {
    const user = await this.jwtService.verify(refreshToken, {secret: process.env.REFRESH_TOKEN_KEY_USER || 'MyAccesVery'});
    if(!user) return HttpStatus.NOT_FOUND;

    await this.userRepository.update({id: user.id}, {hashed_refresh_token: null});

    res.clearCookie('refresh_token');

    return true;
  }

  async activate(link: string): Promise<Object | HttpStatus>  {
    if(!link) return HttpStatus.NOT_FOUND;

    await this.userRepository.update(
      {
        activation_link: link,
        is_active: false
      }, 
      {
        is_active: true
      }
    )

    const [user] = await this.userRepository.findBy({ activation_link: link , is_active: true});
    if(!user) return HttpStatus.FORBIDDEN;

    const response = { message: 'User active successfully', user};

    return response;
  }  

  async refreshTOKEN(user_id: number, refreshToken: string, res: Response): Promise<Object | HttpStatus> {
    const decodedToken = this.jwtService.decode(refreshToken);
    if(user_id != decodedToken['id']) return HttpStatus.NOT_FOUND;

    const user = await this.userRepository.findOne({ where: {id: user_id }});
    if(!user || !user.hashed_refresh_token) return HttpStatus.NOT_FOUND;

    const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!tokenMatch) return HttpStatus.FORBIDDEN;

    const tokens = await this.getTokens(user);
    const hashed_refresh_token  = await bcrypt.hash(tokens.refresh_token, 7);

    await this.userRepository.update({id: user.id}, {hashed_refresh_token});
    const updateUser = await this.userRepository.findBy({ id: user.id });

    res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});

    const response = {message: 'refreshed token successfully', user: updateUser, tokens};

    return response;
  }

  async findUSERS(): Promise<User[] | HttpStatus> {
    const users = await this.userRepository.find();

    if (users.length === 0) return HttpStatus.NOT_FOUND;

    return users;
  }

  async findUSER(id: number): Promise<User | HttpStatus> {
    const [user] = await this.userRepository.findBy({ id });

    if (!user) return HttpStatus.NOT_FOUND;

    return user;
  }

  async updateDATE(id: number, updateDateDto: UpdateDateDto): Promise<User | HttpStatus> {
    const [user] = await this.userRepository.findBy({ id });
    if (!user)  return HttpStatus.NOT_FOUND;
    
    await this.userRepository.update({ id }, {...updateDateDto});
    const [updateUser] = await this.userRepository.findBy({id});

    return updateUser;
  }

  async updatePASSWORD(id: number, updatePasswordDto: UpdatePasswordDto): Promise<User | HttpStatus>  {
    const [user] = await this.userRepository.findBy({ id });
    if (!user) return HttpStatus.NOT_FOUND;

    const pass = await bcrypt.compare(updatePasswordDto.password, user.hashed_password);
    if (!pass) return HttpStatus.CONFLICT;

    if (updatePasswordDto.new_password != updatePasswordDto.confirm_password) return HttpStatus.UNAUTHORIZED;

    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.userRepository.update({id}, {hashed_password});

    const [updatePasswordUser] = await this.userRepository.findBy({ id });

    return updatePasswordUser;
  }

  async removeUSER(id: number): Promise<HttpStatus> {
    const [removeUser] = await this.userRepository.findBy({id});

    if(!removeUser) return HttpStatus.NOT_FOUND;

    await this.userRepository.delete( {id} );

    return HttpStatus.OK;
  }

  async getTokens(user: User) {
    const jwtPayload = { id: user.id, is_active: user.is_active }
  
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCES_TOKEN_KEY_USER || 'MyAccesVery',
        expiresIn: process.env.ACCESS_TOKEN_TIME || '24h'
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY_USER || 'MyAccesVery1',
        expiresIn: process.env.REFRESH_TOKEN_TIME || '24d'
      })
    ]);
    
    return {access_token: accessToken, refresh_token: refreshToken};
  }
}
