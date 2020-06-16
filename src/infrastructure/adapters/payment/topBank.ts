import {IPaymentGateway } from '../../../application/ports/IPaymentGateway';
import { BrandType} from '../../../domain/models/customers/brandType';
import { CPF } from '../../../domain/models/customers/cpf';
import { ExpirationDate } from '../../../domain/models/customers/expirationDate';

export class TopBankGateway extends IPaymentGateway {
  createCard(
    number: string,
    holderName: string,
    holderCpf: CPF,
    expirationDate: ExpirationDate,
    brand: BrandType,
    cvv: string,
  ): Promise<string> {
    return Promise.resolve('123123');
  }
}
