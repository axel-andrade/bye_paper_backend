import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Validate,
} from 'class-validator';

import { IsCPF } from '../../validators/isCPF';

export class CreateCustomerDto {
  @Validate(IsCPF)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'The CPF of the Customer. Can be formatted or unformatted, but should be valid.',
    example: '931.398.804-64',
    required: true,
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  @ApiProperty({
    description:
      'The name of the Customer. Must have at least 5 characters and can`t pass 100 characters.',
    example: 'John Doe',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the customer. The email should be valid.',
    example: 'john.doe@gmail.com',
  })
  email: string;

  @IsPhoneNumber('BR')
  @ApiProperty({
    description:
      'The phone of the customer. The phone should have valid format.',
    example: '31 9 9990-1233',
  })
  phone: string;

  @IsDateString()
  @ApiProperty({
    description:
      'The birth date of the Customer. Should be in ISO Date format.',
    example: new Date(1993, 8, 21),
  })
  birthDate: Date;
}
