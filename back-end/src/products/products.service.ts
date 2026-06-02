import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>      
    ) {}
async addStock(id: string, qty: number) {
  return this.productModel.findByIdAndUpdate(
    id,
    { $inc: { stock: qty } },
    { new: true },
  );
}

  // CREATE
  async create(dto: any) {
    const product = await this.productModel.create(dto);
    return product;
  }

  // GET ALL
  async findAll() {
    return this.productModel.find().sort({ createdAt: -1 });
  }

  // GET ONE
  async findOne(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
//delete//
async removeAll() {
  return this.productModel.deleteMany({});
}
  // UPDATE
  async update(id: string, dto: any) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
//gender//
findByGender(gender: string) {
  return this.productModel.find({ gender });
}

  // DELETE
  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Product deleted successfully',
    };
  }
}