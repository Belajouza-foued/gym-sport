import { IsString, IsNumber } from 'class-validator';

export class AddToCartDto {

  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  size: string;

  @IsNumber()
  quantity: number;
}