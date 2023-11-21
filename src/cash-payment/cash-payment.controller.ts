import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { AdminGuard, UserGuard } from '../guards';
import { CashPaymentService } from './cash-payment.service';
import { CashPayment } from './entities/cash-payment.entity';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';

@ApiTags('cash-payment')
@Controller('cash-payment')
export class CashPaymentController {
  constructor(private readonly cashPaymentService: CashPaymentService) {}

  @ApiOperation({summary: 'Create cash payment'})
  @ApiResponse({status: 201, type: CashPayment})
  @UseGuards(UserGuard)
  @Post('create')
  createCASH(@Body() createCashPaymentDto: CreateCashPaymentDto) {
    return this.cashPaymentService.createCASH(createCashPaymentDto);
  }

  @ApiOperation({summary: 'Find one cash payment'})
  @ApiResponse({status: 201, type: CashPayment})
  @UseGuards(AdminGuard)
  @Get('find-one/:id')
  findOneCASH(@Param('id') id: string) {
    return this.cashPaymentService.findOneCASH(+id);
  }

  @ApiOperation({summary: 'Remove one cash payment'})
  @ApiResponse({status: 201, type: CashPayment})
  @UseGuards(AdminGuard)
  @Delete('remove-one/:id')
  removeCASH(@Param('id') id: string) {
    return this.cashPaymentService.removeCASH(+id);
  }
}
