import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpStatus, Put } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { CreateJewelryDto, UpdateJewelryDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Jewelry } from './entities/jewelry.entity';
import { AdminGuard, UserGuard } from '../guards';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('jewelry')
@Controller('jewelry')
export class JewelryController {
  constructor(private readonly jewelryService: JewelryService) {}
  
  @ApiOperation({summary: 'Create new jewelry'})
  @ApiResponse({status: 201, type: Jewelry})
  @UseGuards(AdminGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('jewelry_photo'))
  createJEWELRY(@Body() createJewelryDto: CreateJewelryDto, @UploadedFile() jewelry_photo: any): Promise<Jewelry> {
    return this.jewelryService.createJEWELRY(createJewelryDto, jewelry_photo);
  }

  @ApiOperation({summary: 'Find all jewelries'})
  @ApiResponse({status: 200, type: [Jewelry]})
  @Get('find-all')
  findAllJEWELRY(): Promise<Jewelry[] | HttpStatus> {
    return this.jewelryService.findAllJEWELRY();
  }

  @ApiOperation({summary: 'Find one jewelry'})
  @ApiResponse({status: 200, type: Jewelry})
  @Get('find-one/:id')
  findOneJEWELRY(@Param('id') id: number): Promise<Jewelry | HttpStatus> {
    return this.jewelryService.findOneJEWELRY(id);
  }

  @ApiOperation({summary: 'Update one jewelry'})
  @ApiResponse({status: 200, type: Jewelry})
  @UseGuards(AdminGuard)
  @Put('update-one/:id')
  @UseInterceptors(FileInterceptor('jewelry_photo'))
  updateJEWELRY(@Param('id') id: number, @Body() updateJewelryDto: UpdateJewelryDto, @UploadedFile() jewelry_photo: any): Promise<Jewelry | HttpStatus> {
    return this.jewelryService.updateJEWELRY(id, updateJewelryDto, jewelry_photo)
  }

  @ApiOperation({summary: 'Remove one jewelry'})
  @ApiResponse({status: 200, type: Jewelry})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeJEWELRY(@Param('id') id: number): Promise<Boolean | HttpStatus> {
    return this.jewelryService.removeJEWELRY(id);
  }
}

