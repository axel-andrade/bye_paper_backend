import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { Product } from '../../../domain/models/products/product';

export class ProductDto {
  @Expose()
  @ApiProperty({
    description: 'The product id.',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The title of product.',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The description of product.',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The date a product was created.',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date a product was last modified.',
  })
  updatedAt: Date;

  static toDto(product: Product): ProductDto {
    return plainToClass(
      ProductDto,
      product,
      { excludeExtraneousValues: true },
    );
  }

  static toDtos(Products: Product[]): ProductDto[] {
    return Products.map(c => ProductDto.toDto(c));
  }
}
