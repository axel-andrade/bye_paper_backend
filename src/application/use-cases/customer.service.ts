import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ICustomersRepository} from '../ports/ICustomerRepository';
import { IPaymentGateway } from '../ports/IPaymentGateway';
import { BrandType} from '../../domain/models/customers/brandType';
import { Card} from '../../domain/models/customers/card';
import { CPF } from '../../domain/models/customers/cpf';
import { Customer} from '../../domain/models/customers/customer';
import { ExpirationDate } from '../../domain/models/customers/expirationDate';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    private readonly customersRepository: ICustomersRepository,
    private readonly paymentGateway: IPaymentGateway,
  ) {}

  async createCustomer(
    cpf: string,
    name: string,
    email: string,
    phone: string,
    birthDate: Date,
  ): Promise<Customer> {
    const customer = new Customer(cpf, name, email, phone, birthDate);

    this.logger.log(`Creating Customer '${new CPF(cpf).formatted()}`);
    return await this.customersRepository.save(customer);
  }

  async findAllCustomers() {
    this.logger.log(`Fetching all Customers`);
    return await this.customersRepository.find();
  }

  async findCustomerByCpf(cpf: CPF) {
    this.logger.log(`Fetching Customer '${cpf.formatted()}'`);
    const customer = await this.customersRepository.findOne({
      where: { cpf },
    });

    if (!customer)
      throw new NotFoundException(
        `O cliente com o cpf '${cpf.formatted()}' não foi encontrado`,
      );

    return customer;
  }

  async createCard(
    customerCpf: string,
    number: string,
    holderName: string,
    holderCpf: string,
    expirationYear: string,
    expirationMonth: string,
    brand: BrandType,
    cvv: string,
    isDefault: boolean,
  ): Promise<Card> {
    const cpf = new CPF(customerCpf);

    this.logger.log(`Searching for customer ${cpf.formatted()}`);
    const customer = await this.customersRepository.findOne({
      where: { cpf },
      relations: ['cards'],
    });

    if (customer == null)
      throw new NotFoundException(
        `O cliente com o cpf '${cpf.formatted()}' não foi encontrado`,
      );

    this.logger.log(
      `Creating card ${number} in Gateway for customer ${cpf.formatted()}`,
    );

    const token = await this.paymentGateway.createCard(
      number,
      holderName,
      new CPF(holderCpf),
      new ExpirationDate(expirationYear, expirationMonth),
      brand,
      cvv,
    );

    if (token == null)
      throw new InternalServerErrorException(
        'Ocorreu um erro ao chamar o serviço de Gateway. O retorno não é o esperado',
      );

    customer.registerCard(
      token,
      number,
      holderName,
      new CPF(holderCpf),
      expirationYear,
      expirationMonth,
      brand,
      cvv,
      isDefault,
    );

    this.logger.log(
      `Registering new card for customer ${cpf.formatted()} on our database`,
    );

    const savedCustomer = await this.customersRepository.save(customer);

    return savedCustomer.getCard(token);
  }
}
