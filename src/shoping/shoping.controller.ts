import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';

import { AdminGuard, UserGuard } from '../guards';
import { ShopingService } from './shoping.service';
import { Shoping } from './entities/shoping.entity';
import { CreateShopingDto, UpdateShopingDto } from './dto';

@ApiTags('shoping')
@Controller('shoping')
export class ShopingController {
  constructor(private readonly shopingService: ShopingService) {}

  @ApiOperation({summary: 'Create new shoping'})
  @ApiResponse({status: 201, type: Shoping})
  @UseGuards(UserGuard)
  @Post('create')
  createSHOPING(@Body() createShopingDto: CreateShopingDto) {
    return this.shopingService.createSHOPING(createShopingDto);
  }

  @ApiOperation({summary: 'Find all shopings'})
  @ApiResponse({status: 201, type: [Shoping]})
  @UseGuards(AdminGuard)
  @Get('find-all')
  findAllSHOPING() {
    return this.shopingService.findAllSHOPING();
  }

  @ApiOperation({summary: 'Find one shoping'})
  @ApiResponse({status: 201, type: Shoping})
  @UseGuards(UserGuard)
  @Get('find-one/:id')
  findOneSHOPING(@Param('id') id: string) {
    return this.shopingService.findOneSHOPING(+id);
  }

  @ApiOperation({summary: 'Update one shoping'})
  @ApiResponse({status: 201, type: [Shoping]})
  @UseGuards(AdminGuard)
  @Put('update-one/:id')
  updateSHOPING(@Param('id') id: string, @Body() updateShopingDto: UpdateShopingDto) {
    return this.shopingService.updateSHOPING(+id, updateShopingDto);
  }

  @ApiOperation({summary: 'Remove one shoping'})
  @ApiResponse({status: 201, type: Boolean})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeSHOPING(@Param('id') id: string) {
    return this.shopingService.removeSHOPING(+id);
  }
}
