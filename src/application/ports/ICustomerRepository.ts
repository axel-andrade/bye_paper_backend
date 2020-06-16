import { Injectable } from '@nestjs/common';

import { IRepository } from './IRepository';
import { Customer} from '../../domain/models/customers/customer';

@Injectable()
export abstract class ICustomersRepository extends IRepository<Customer> {}
