import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';

import { AdminGuard, UserGuard } from '../guards';
import { CardPaymentService } from './card-payment.service';
import { CardPayment } from './entities/card-payment.entity';
import { CreateCardPaymentDto, UpdateCardPaymentDto } from './dto';

@ApiTags('card-payment')
@Controller('card-payment')
export class CardPaymentController {
  constructor(private readonly cardPaymentService: CardPaymentService) {}

  @ApiOperation({summary: 'Create card payment'})
  @ApiResponse({status: 201, type: CardPayment})
  @UseGuards(UserGuard)
  @Post('create')
  createCARD(@Body() createCardPaymentDto: CreateCardPaymentDto) {
    return this.cardPaymentService.createCARD(createCardPaymentDto);
  }

  @ApiOperation({summary: 'Find all cash payment'})
  @ApiResponse({status: 201, type: [CardPayment]})
  @UseGuards(AdminGuard)
  @Get('find-all')
  findAllCARD() {
    return this.cardPaymentService.findAllCARD();
  }

  @ApiOperation({summary: 'Find one cash payment'})
  @ApiResponse({status: 201, type: CardPayment})
  @UseGuards(AdminGuard)
  @Get('find-one/:id')
  findOneCARD(@Param('id') id: string) {
    return this.cardPaymentService.findOneCARD(+id);
  }

  @ApiOperation({summary: 'Update one cash payment'})
  @ApiResponse({status: 201, type: CardPayment})
  @UseGuards(UserGuard)
  @Put('update-one/:id')
  updateCARD(@Param('id') id: string, @Body() updateCardPaymentDto: UpdateCardPaymentDto) {
    return this.cardPaymentService.updateCARD(+id, updateCardPaymentDto);
  }

  @ApiOperation({summary: 'Remove one cash payment'})
  @ApiResponse({status: 201, type: Boolean})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeCARD(@Param('id') id: string) {
    return this.cardPaymentService.removeCARD(+id);
  }
}
