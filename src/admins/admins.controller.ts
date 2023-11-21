import { Admin } from 'typeorm';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, HttpStatus, Res, UseGuards, Put, Delete } from '@nestjs/common';

import { AdminsService } from './admins.service';
import { AdminGuard, SuperAdminGuard } from '../guards';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { SignInDto, SignUpDto, UpdateDateDto, UpdatePasswordDto } from './dto';

@ApiTags('admin')
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({summary: 'Admin sign up'})
  @ApiResponse({status: 201, type: Admin})
  @Post('signup')
  signUP(@Body() signUpDto: SignUpDto, @Res({passthrough: true}) res: Response): Promise<Object | HttpStatus> {
    return this.adminsService.signUP(signUpDto, res);
  }

  @ApiOperation({summary: 'Admin sign in'})
  @ApiResponse({status: 201, type: Admin})
  @Post('signin')
  signIN(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: Response): Promise<Object | HttpStatus> {
    return this.adminsService.signIN(signInDto, res)
  }

  @ApiOperation({summary: 'Admin sign out'})
  @ApiResponse({status: 200, type: Boolean})
  @UseGuards(AdminGuard)
  @Post('signout')
  signOUT(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response): Promise<boolean | HttpStatus> {
    return this.adminsService.signOUT(refreshToken, res);
  }

  @ApiOperation({summary: 'Admin status activate'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('activate/:link')
  activate(@Param('link') link: string): Promise<Object | HttpStatus>  {
    return this.adminsService.activate(link);
  }

  @ApiOperation({summary: 'admin token refreshed'})
  @ApiResponse({status: 200, type: [Admin]})
  @Post(':id/refresh')
  refreshTOKEN(@Param('id') id: number, @CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true}) res: Response): Promise<Object | HttpStatus> {
    return this.adminsService.refreshTOKEN(id, refreshToken, res);
  }

  @ApiOperation({ summary: 'find all admins'})
  @ApiResponse({status: 200, type: [Admin]})
  @UseGuards(AdminGuard)
  @Get('find-all')
  findADMINS(): Promise<Object | HttpStatus> {
    return this.adminsService.findADMINS()
  }

  @ApiOperation({ summary: 'find one admin'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Get('find-one/:id')
  findADMIN(@Param('id') id: number): Promise<Object | HttpStatus> {
    return this.adminsService.findADMIN(id)
  }

  @ApiOperation({ summary: 'update one admin date'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Put('update-date/:id')
  updateDATE(@Param('id') id: number, @Body() updateDateDto: UpdateDateDto): Promise<Object | HttpStatus> {
    return this.adminsService.updateDATE(id, updateDateDto)
  }

  @ApiOperation({ summary: 'update one admin password'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Put('update-password/:id')
  updatePASSWORD(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto): Promise<Object | HttpStatus> {
    return this.adminsService.updatePASSWORD(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'remove one admin'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(SuperAdminGuard)
  @Delete('remove-one/:id')
  removeADMIN(@Param('id') id: number): Promise<HttpStatus> {
    return this.adminsService.removeADMIN(id);
  }
}