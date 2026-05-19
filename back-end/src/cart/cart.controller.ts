import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  // ➕ ADD TO CART
 @Post()
addToCart(@Body() dto: any) {
  console.log("🔥 CART ROUTE HIT");
  return this.cartService.addToCart(dto);
}

  // 📦 GET CART
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  // ❌ REMOVE ITEM
  @Delete(':userId/:productId')
  remove(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItem(userId, productId);
  }
}