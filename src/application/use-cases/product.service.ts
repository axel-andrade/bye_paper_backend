import { Injectable } from '@nestjs/common';
import { IProductRepository} from '../ports/IProductRepository';
import { Product  } from '../../domain/models/products/product';

@Injectable()
export class  ProductService {
  constructor(
    private readonly repository: IProductRepository,
  ) {}

  async get(): Promise<Product[]> {
    return await this.repository.find();
  }

  async post(product: Product): Promise<Product>{
    return await this.repository.save(product);
  }

  async put(id: number, product: Product){
    return await this.repository.update(id, product);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
