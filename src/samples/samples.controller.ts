import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';

import { Sample } from './entities/sample.entity';
import { AdminGuard, UserGuard } from '../guards';
import { SamplesService } from './samples.service';
import { CreateSampleDto, UpdateSampleDto } from './dto';

@ApiTags('sample')
@Controller('sample')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @ApiOperation({summary: 'Create new sample'})
  @ApiResponse({status: 201, type: Sample})
  @UseGuards(AdminGuard)
  @Post('create')
  createSAMPLE(@Body() createSampleDto: CreateSampleDto): Promise<Sample | HttpStatus> {
    return this.samplesService.createSAMPLE(createSampleDto);
  }

  @ApiOperation({summary: 'Find all samples'})
  @ApiResponse({status: 201, type: [Sample]})
  @Get('find-all')
  findAllSAMPLES(): Promise<Sample[] | HttpStatus> {
    return this.samplesService.findAllSAMPLES();
  }

  @ApiOperation({summary: 'Find one sample'})
  @ApiResponse({status: 201, type: Sample})
  @Get('find-one/:id')
  findOneSAMPLE(@Param('id') id: string): Promise<Sample | HttpStatus> {
    return this.samplesService.findOneSAMPLE(+id);
  }

  @ApiOperation({summary: 'Update one sample'})
  @ApiResponse({status: 201, type: Sample})
  @UseGuards(AdminGuard)
  @Put('update-one/:id')
  updateSAMPLE(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto): Promise<Sample | HttpStatus> {
    return this.samplesService.updateSAMPLE(+id, updateSampleDto);
  }

  @ApiOperation({summary: 'Remove one sample'})
  @ApiResponse({status: 201, type: Boolean})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeSAMPLE(@Param('id') id: string): Promise<Boolean | HttpStatus> {
    return this.samplesService.removeSAMPLE(+id);
  }
}