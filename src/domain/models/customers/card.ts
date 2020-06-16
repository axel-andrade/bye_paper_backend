import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BrandType } from './brandType';
import { CPF } from './cpf';
import { Customer} from './customer';
import { ExpirationDate} from './expirationDate';
import { IEntity } from '../shared/IEntity';

@Entity({
  // schema: 'customers',
  name: 'cards',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Card implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ length: 4 })
  number: string;

  @Column({ length: 100 })
  holderName: string;

  @Column({
    type: 'varchar',
    length: 11,
    transformer: {
      from: value => new CPF(value),
      to: (value: CPF) => value.unformatted(),
    },
  })
  holderCpf: CPF;

  @Column(() => ExpirationDate, { prefix: false })
  expirationDate: ExpirationDate;

  @Column({ enum: BrandType, type: 'enum' })
  brand: BrandType;

  @Column({ length: 3 })
  cvv: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;

  @ManyToOne(
    () => Customer,
    customer => customer.cards,
  )
  customer: Customer;

  constructor(
    token: string,
    number: string,
    holderName: string,
    holderCpf: CPF,
    expirationYear: string,
    expirationMonth: string,
    brand: BrandType,
    cvv: string,
  ) {
    this.token = token;
    this.number = number?.substr(-4);
    this.holderName = holderName;
    this.holderCpf = holderCpf;
    this.expirationDate = new ExpirationDate(expirationYear, expirationMonth);
    this.brand = brand;
    this.cvv = cvv;
  }

  equals(entity: IEntity): boolean {
    return entity instanceof Card && this.token === entity.token;
  }
}
