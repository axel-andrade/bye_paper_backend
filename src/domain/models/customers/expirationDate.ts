import { Column } from 'typeorm';

import { DomainException} from '../../exceptions/DomainException';
import { IValueObject} from '../shared/IValueObject';

export class ExpirationDate implements IValueObject {
  private static readonly YEAR_PATTERN = /^(\d{2}|\d{4})$/gm;
  private static readonly MONTH_PATTERN = /^(\d{2})$/gm;

  @Column({ length: 2, name: 'expirationYear' })
  year: string;

  @Column({ length: 2, name: 'expirationMonth' })
  month: string;

  constructor(year: string, month: string) {
    ExpirationDate.assertYear(year);
    ExpirationDate.assertMonth(month);

    this.year = ExpirationDate.formatYear(year);
    this.month = month;
  }

  equals(valueObject: IValueObject): boolean {
    return (
      valueObject instanceof ExpirationDate &&
      this.month === valueObject.month &&
      this.year === valueObject.year
    );
  }

  getMonth() {
    return this.month;
  }

  getFullYear() {
    return `20${this.getYear()}`;
  }

  getYear() {
    return this.year;
  }

  getFormattedExpirationDate() {
    return `${this.getMonth()}/${this.getFullYear()}`;
  }

  private static assertYear(year: string): void {
    if (!year) return;
    if (!year.match(ExpirationDate.YEAR_PATTERN))
      throw new DomainException(
        'O valor de ano em expiration date é inválido. Deve possuir o padrão YYYY ou YY',
      );
  }

  private static formatYear(year: string) {
    if (!year) return year;
    return year.length === 2 ? year : year.substr(-2);
  }

  private static assertMonth(month: string): void {
    if (!month) return;
    if (
      !month?.match(ExpirationDate.MONTH_PATTERN) ||
      parseInt(month, 10) <= 0 ||
      parseInt(month, 10) > 12
    )
      throw new DomainException(
        'O valor de mês em expiration date é inválido. Deve possuir o padrão MM',
      );
  }
}
