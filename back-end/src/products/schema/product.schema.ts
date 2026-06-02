import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Product {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;
  
  @Prop({
  enum: ["men", "women", "kids"],
  required: true,
})
gender: string;

  @Prop({ required: true })
  image: string;
  
  @Prop({ type: [String], default: [] })
images: string[];

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  brand: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: [String], default: [] })
  sizes: string[];

  @Prop({ type: [String], default: [] })
  colors: string[];
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);