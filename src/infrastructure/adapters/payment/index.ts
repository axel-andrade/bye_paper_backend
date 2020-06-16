import { TopBankGateway } from './topBank';

export function GatewayFactory(gateway) {
  switch (gateway) {
    case 'PAGAR_ME':
    case 'IUGU':
    case 'CIELO':
    case 'TOP_BANK':
    default:
      return TopBankGateway;
  }
}
