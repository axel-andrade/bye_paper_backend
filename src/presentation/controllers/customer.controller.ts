import {
  Body,
  Controller,
  Get, HttpException, HttpStatus,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CustomersService } from '../../application/use-cases/customer.service';
import { DomainException } from '../../domain/exceptions/DomainException';
import { CPF } from '../../domain/models/customers/cpf';
import { CreateCustomerDto } from '../dtos/customers/createCustomerDto';
import { CustomerDto } from '../dtos/customers/customerDto';
import { ResultDto } from '../dtos/result/result.dto';

@ApiTags('Customers')
@Controller(`v1/customers`)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a Customer',
    description:
      'The `Customer` in this module can be either an `Payer` as an `Receiver`. However, the most of the use cases the Customer assumes the role of `Payer`.',
  })
  @ApiCreatedResponse({ description: 'Customer created.', type: CustomerDto })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating Customer',
  })
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customersService.createCustomer(
        createCustomerDto.cpf,
        createCustomerDto.name,
        createCustomerDto.email,
        createCustomerDto.phone,
        createCustomerDto.birthDate,
      );

      return CustomerDto.toDto(customer);
    } catch (err) {
      throw new HttpException(new ResultDto('Não foi possível incluir o cliente', false, null, err), HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':cpf')
  @ApiOperation({
    summary: 'Find a Customer by its Cpf',
    description:
      'It will throw an Error if there is no `Customer` with with the passed params.',
  })
  @ApiParam({
    name: 'cpf',
    type: String,
    description:
      'The `Cpf` of the customer. Should be a **valid** Cpf. Can be **formatted** or **unformatted**.',
  })
  @ApiOkResponse({ description: 'Customer founded.', type: CustomerDto })
  @ApiNotFoundResponse({
    description: 'Customer not founded.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The `Cpf` is invalid.',
  })
  async findCustomerByCpf(@Param('cpf') cpf: string): Promise<CustomerDto> {
    try {
      const theCpf = new CPF(cpf);
      const customer = await this.customersService.findCustomerByCpf(theCpf);

      return CustomerDto.toDto(customer);
    } catch (err) {
      throw new HttpException(new ResultDto('Não foi possível incluir o cliente', false, null, err), HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Find all Customers',
    description: 'This method will return all `Customers` registered.',
  })
  @ApiOkResponse({
    description: 'All `Customer`\'s fetched.',
    type: [CustomerDto],
  })
  async findAllCustomers(): Promise<CustomerDto[]> {
    const customers = await this.customersService.findAllCustomers();

    return CustomerDto.toDtos(customers);
  }
}
