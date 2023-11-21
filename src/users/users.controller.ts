import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, UseGuards, Put } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AdminGuard, UserGuard } from '../guards';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { SignInDto, SignUpDto, UpdateDateDto, UpdatePasswordDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @ApiOperation({summary: 'User sign up'})
  @ApiResponse({status: 201, type: User})
  @Post('signup')
  signUP(@Body() signUpDto: SignUpDto, @Res({passthrough: true}) res: Response): Promise<Object | HttpStatus> {
    return this.usersService.signUP(signUpDto, res);
  }

  @ApiOperation({summary: 'User sign in'})
  @ApiResponse({status: 201, type: User})
  @Post('signin')
  signIN(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: Response): Promise<Object | HttpStatus> {
    return this.usersService.signIN(signInDto, res)
  }

  @ApiOperation({summary: 'User sign out'})
  @ApiResponse({status: 200, type: Boolean})
  @UseGuards(UserGuard)
  @Post('signout')
  signOUT(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response): Promise<boolean | HttpStatus> {
    return this.usersService.signOUT(refreshToken, res);
  }

  @ApiOperation({summary: 'User status activate'})
  @ApiResponse({status: 200, type: [User]})
  @Get('activate/:link')
  activate(@Param('link') link: string): Promise<Object | HttpStatus>  {
    return this.usersService.activate(link);
  }

  @ApiOperation({summary: 'User token refreshed'})
  @ApiResponse({status: 200, type: [User]})
  @Post(':id/refresh')
  refreshTOKEN(@Param('id') id: number, @CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true}) res: Response): Promise<Object | HttpStatus> {
    return this.usersService.refreshTOKEN(id, refreshToken, res);
  }

  @ApiOperation({ summary: 'find all users'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(UserGuard)
  @Get('find-all')
  findADMINS(): Promise<Object | HttpStatus> {
    return this.usersService.findUSERS()
  }

  @ApiOperation({ summary: 'find one user'})
  @ApiResponse({status: 200, type: User})
  @UseGuards(UserGuard)
  @Get('find-one/:id')
  findADMIN(@Param('id') id: number): Promise<Object | HttpStatus> {
    return this.usersService.findUSER(id)
  }

  @ApiOperation({ summary: 'update one user date'})
  @ApiResponse({status: 200, type: User})
  @UseGuards(UserGuard)
  @Put('update-date/:id')
  updateDATE(@Param('id') id: number, @Body() updateDateDto: UpdateDateDto): Promise<Object | HttpStatus> {
    return this.usersService.updateDATE(id, updateDateDto)
  }

  @ApiOperation({ summary: 'update one user password'})
  @ApiResponse({status: 200, type: User})
  @UseGuards(UserGuard)
  @Put('update-password/:id')
  updatePASSWORD(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto): Promise<Object | HttpStatus> {
    return this.usersService.updatePASSWORD(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'remove one user'})
  @ApiResponse({status: 200, type: User})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeADMIN(@Param('id') id: number): Promise<HttpStatus> {
    return this.usersService.removeUSER(id);
  }

  // active false yozish
}