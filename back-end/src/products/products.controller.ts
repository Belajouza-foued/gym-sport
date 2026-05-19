import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ProductsService } from './products.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}
//stoc//
 @Patch(':id/stock/add')
  addStock(
    @Param('id') id: string,
    @Body('qty') qty: number,
  ) {
    return this.productsService.addStock(id, qty);
  }
  // CREATE
  @Post()@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
  create(@Body() dto: any) {
    return this.productsService.create(dto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
  update(
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    return this.productsService.update(id, dto);
  }

  // DELETE
  @Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}