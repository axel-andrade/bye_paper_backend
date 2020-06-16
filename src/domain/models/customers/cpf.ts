import { CpfValidator, CpfFormatter } from '@braziliankit/core';
import { DomainException} from '../../exceptions/DomainException';
import { IValueObject} from '../shared/IValueObject';

export class CPF implements IValueObject {
  private readonly formatter: CpfFormatter;
  value: string;

  constructor(value: string) {
    const validator = new CpfValidator();
    if (value && !validator.isValid(value))
      throw new DomainException('Valor do CPF é inválido');

    this.formatter = new CpfFormatter();
    this.value = this.formatter.unformat(value);
  }

  formatted(): string {
    return this.formatter.format(this.value);
  }

  unformatted(): string {
    return this.formatter.unformat(this.value);
  }

  equals(valueObject: IValueObject): boolean {
    return valueObject instanceof CPF && this.value === valueObject.value;
  }
}
