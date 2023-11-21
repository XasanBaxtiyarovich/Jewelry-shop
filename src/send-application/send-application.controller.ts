import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { AdminGuard, UserGuard } from '../guards';
import { SendApplicationService } from './send-application.service';
import { SendApplication } from './entities/send-application.entity';
import { CreateSendApplicationDto } from './dto/create-send-application.dto';

@ApiTags('applications')
@Controller('send-application')
export class SendApplicationController {
  constructor(private readonly sendApplicationService: SendApplicationService) {}

  @ApiOperation({summary: 'Send new application'})
  @ApiResponse({status: 201, type: SendApplication})
  @UseGuards(UserGuard)
  @Post()
  createAPPLICATIONS(@Body() createSendApplicationDto: CreateSendApplicationDto) {
    return this.sendApplicationService.createAPPLICATIONS(createSendApplicationDto);
  }

  @ApiOperation({summary: 'Find all applications'})
  @ApiResponse({status: 201, type: [SendApplication]})
  @UseGuards(AdminGuard) 
  @Get('find-all')
  findAllAPPLICATIONS() {
    return this.sendApplicationService.findAllAPPLICATIONS();
  }

  @ApiOperation({summary: 'Find one application'})
  @ApiResponse({status: 201, type: SendApplication})
  @UseGuards(AdminGuard) 
  @Get('find-one/:id')
  findOneAPPLICATIONS(@Param('id') id: string) {
    return this.sendApplicationService.findOneAPPLICATIONS(+id);
  }

  @ApiOperation({summary: 'Remove one application'})
  @ApiResponse({status: 201, type: Boolean})
  @UseGuards(AdminGuard) 
  @Delete('remove-one/:id')
  remove(@Param('id') id: string) {
    return this.sendApplicationService.removeAPPLICATIONS(+id);
  }
}
