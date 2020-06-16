import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { format, parseISO } from 'date-fns';
import { Customer } from '../../../domain/models/customers/customer';

export class CustomerDto {
  @Expose()
  @ApiProperty({
    description: 'The customer Id in our base. It`s not really used.',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The CPF of the customer.',
  })
  cpf: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the customer',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The email of the customer.',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The phone of the customer.',
  })
  phone: string;

  @Expose()
  @ApiProperty({
    description: 'The birth date of the customer.',
  })
  birthDate: string;

  @Expose()
  @ApiProperty({
    description: 'The date a customer was created.',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date a customer was last modified.',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description:
      'The date if the customer was deleted. We use soft delete, for historical purposes.',
  })
  deletedAt: Date;

  static toDto(customer: Customer): CustomerDto {
    const birthDate = new Date(customer.birthDate);
    const normalizeDate = new Date(
      birthDate.valueOf() + birthDate.getTimezoneOffset() * 60 * 1000,
    );
    return plainToClass(
      CustomerDto,
      {
        ...customer,
        cpf: customer.cpf.formatted(),
        birthDate: format(normalizeDate, 'dd/MM/yyyy'),
      },
      { excludeExtraneousValues: true },
    );
  }

  static toDtos(customers: Customer[]): CustomerDto[] {
    return customers.map(c => CustomerDto.toDto(c));
  }
}
