import { Module } from '@nestjs/common';

import { ICustomersRepository} from '../../application/ports/ICustomerRepository';
import { IPaymentGateway} from '../../application/ports/IPaymentGateway';
import { CustomersService} from '../../application/use-cases/customer.service';
import { CustomerRepository } from '../database/repositories/CustomerRepository';
import { GatewayFactory } from '../adapters/payment';
import { CustomersController } from '../../presentation/controllers/customer.controller';

const GATEWAY = process.env.GATEWAY;

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    { provide: IPaymentGateway, useFactory: () => GatewayFactory(GATEWAY) },
    { provide: ICustomersRepository, useClass: CustomerRepository },
  ],
})

export class CustomerModule {}
