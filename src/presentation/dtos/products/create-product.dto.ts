import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Product } from '../../../domain/models/products/product';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O título do produto',
    example: 'Tv 42 polegadas',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A descrição do produto',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
  description: string;

  static fromDto(dto: CreateProductDto): Product {
    return new Product(dto.title, dto.description);
  }
}
