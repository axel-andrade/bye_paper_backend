import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../domain/models/product.entity';
import { ProductService } from '../../application/use-cases/product.service';
import { ProductController } from '../../presentation/controllers/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product
  ])],
  providers: [
    ProductService
  ],
  controllers: [
    ProductController
  ],
})
export class ProductModule {}
