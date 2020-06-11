import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/models/product.entity';

@Injectable()
export class  ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
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
