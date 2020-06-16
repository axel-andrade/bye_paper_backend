import { CpfValidator } from '@braziliankit/core';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCPF implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `O valor de CPF é inválido`;
  }

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const validator = new CpfValidator();
    return validator.isValid(value);
  }
}
