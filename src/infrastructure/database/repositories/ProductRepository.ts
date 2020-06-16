import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { nameof } from 'ts-simple-nameof';
import { Connection } from 'typeorm';

import { IProductRepository } from '../../../application/ports/IProductRepository';
import { Product } from '../../../domain/models/products/product';
import { BaseRepository} from './BaseRepository';

@Injectable()
export class ProductRepository extends BaseRepository<Product>
  implements IProductRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, nameof(Product));
  }
}
