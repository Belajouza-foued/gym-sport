import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // 🟢 CREATE ORDER (checkout)
  @Post()
  create(@Body() dto: any) {
    return this.ordersService.createOrder(dto);
  }

  // 📦 GET USER ORDERS
  @Get(':userId')
  getUserOrders(@Param('userId') userId: string) {
    return this.ordersService.getUserOrders(userId);
  }

  // 🔵 UPDATE STATUS (admin)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}