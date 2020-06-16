import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { nameof } from 'ts-simple-nameof';
import { Connection } from 'typeorm';

import { ICustomersRepository } from '../../../application/ports/ICustomerRepository';
import { Customer} from '../../../domain/models/customers/customer';
import { BaseRepository} from './BaseRepository';

@Injectable()
export class CustomerRepository extends BaseRepository<Customer>
  implements ICustomersRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, nameof(Customer));
  }
}
