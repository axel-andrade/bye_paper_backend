import { BrandType} from '../../domain/models/customers/brandType';
import { ExpirationDate} from '../../domain/models/customers/expirationDate';
import {CPF} from '../../domain/models/customers/cpf';

export abstract class IPaymentGateway {
  abstract createCard(
    number: string,
    holderName: string,
    holderCpf: CPF,
    expirationDate: ExpirationDate,
    brand: BrandType,
    cvv: string,
  ): Promise<string>;
}
