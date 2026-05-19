import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

  @Prop({ required: true })
  userId: string;

  @Prop([
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ])
  items: any[];

  @Prop()
  totalPrice: number;

  @Prop({
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);