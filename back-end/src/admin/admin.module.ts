import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from '../admin/admin.controllers';
import { AdminService } from '../admin/admin.servive';

import { Product, ProductSchema } from '../products/schema/product.schema';
import { User, UserSchema } from '../users/schema/user.schema';
import { Order, OrderSchema } from '../orders/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],

  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}