import { Module } from '@nestjs/common';
import { ProductService } from '../../application/use-cases/product.service';
import { ProductController } from '../../presentation/controllers/product.controller';
import { IProductRepository } from '../../application/ports/IProductRepository';
import { ProductRepository } from '../database/repositories/ProductRepository';

@Module({
  imports: [],
  providers: [
    ProductService,
    { provide: IProductRepository, useClass: ProductRepository },
  ],
  controllers: [
    ProductController
  ],
})
export class ProductModule {}
