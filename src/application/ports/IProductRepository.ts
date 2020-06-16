import { Injectable } from '@nestjs/common';

import { IRepository } from './IRepository';
import { Product } from '../../domain/models/products/product';

@Injectable()
export abstract class IProductRepository extends IRepository<Product> {}
