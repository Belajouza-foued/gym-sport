import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) {}

  // ➕ ADD TO CART
  async addToCart(dto: any) {
    let cart = await this.cartModel.findOne({
      userId: dto.userId,
    });

    if (!cart) {
      cart = await this.cartModel.create({
        userId: dto.userId,
        items: [],
        totalPrice: 0,
      });
    }

    cart.items.push({
      productId: dto.productId,
      name: dto.name,
      price: dto.price,
        size: dto.size,
         color: dto.color,
      quantity: dto.quantity,
     
    });

    cart.totalPrice += dto.price * dto.quantity;

    return cart.save();
  }

  // 📦 GET CART
  async getCart(userId: string) {
    return this.cartModel.findOne({ userId });
  }

  // ❌ REMOVE ITEM (FIXED)
  async removeItem(userId: string, productId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { productId },
        },
      },
      { new: true },
    );
  }

  // 🧹 CLEAR CART
  async clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      {
        items: [],
        totalPrice: 0,
      },
      { new: true },
    );
  }
}