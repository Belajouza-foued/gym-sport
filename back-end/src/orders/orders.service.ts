import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  // 🟢 CREATE ORDER (checkout)
  async createOrder(dto: any) {
    const totalPrice = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return this.orderModel.create({
      userId: dto.userId,
      items: dto.items,
      totalPrice,
      status: 'pending',
    });
  }

  // 📦 GET USER ORDERS
  async getUserOrders(userId: string) {
    return this.orderModel.find({ userId });
  }

  // 🔵 UPDATE STATUS (admin)
  async updateStatus(id: string, status: string) {
    return this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}