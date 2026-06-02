import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from '../products/schema/product.schema';
import { User, UserDocument } from '../users/schema/user.schema';
import { Order, OrderDocument } from '../orders/schema/order.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  // 📊 STATS DASHBOARD
  async getStats() {
    return {
      products: await this.productModel.countDocuments(),
      users: await this.userModel.countDocuments(),
      orders: await this.orderModel.countDocuments(),
    };
  }

  // 📦 ALL ORDERS
  async getAllOrders() {
    return this.orderModel.find().sort({ createdAt: -1 });
  }

  // 👥 ALL USERS
  async getAllUsers() {
    return this.userModel.find().select('-password');
  }
//delete order//
async deleteOrder(id: string) {
  return this.orderModel.findByIdAndDelete(id);
}
  // 🔄 UPDATE ORDER STATUS
  async updateOrderStatus(id: string, status: string) {
    return this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}