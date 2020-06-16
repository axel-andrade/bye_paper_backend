import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DomainException} from '../../exceptions/DomainException';
import { BrandType} from './brandType';
import { Card } from './card';
import { CPF} from './cpf';
import { IAggregateRoot } from '../shared/IAggregateRoot';
import { IEntity} from '../shared/IEntity';

@Entity({
  // schema: 'customers',
  name: 'customers',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Customer implements IAggregateRoot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 11,
    transformer: {
      from: dbValue => new CPF(dbValue),
      to: (data: CPF) => data.value,
    },
  })
  cpf: CPF;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany(
    () => Card,
    card => card.customer,
    { cascade: ['insert', 'update'], onDelete: 'CASCADE' },
  )
  cards: Card[];

  @OneToOne(() => Card)
  @JoinColumn()
  defaultCard: Card;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;

  constructor(
    cpf: string,
    name: string,
    email: string,
    phone: string,
    birthDate: Date,
  ) {
    this.cpf = new CPF(cpf);
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.birthDate = birthDate; // TODO: Criar Value Object?
  }

  registerCard(
    token: string,
    number: string,
    holderName: string,
    holderCpf: CPF,
    expirationYear: string,
    expirationMonth: string,
    brand: BrandType,
    cvv: string,
    isDefault = false,
  ): void {
    const card = new Card(
      token,
      number,
      holderName,
      holderCpf,
      expirationYear,
      expirationMonth,
      brand,
      cvv,
    );

    if (!this.cards) this.cards = [];

    this.cards.forEach(c => {
      if (c.equals(card)) throw new DomainException('Cartão já cadastrado');
    });

    if (this.cards.length === 0 || isDefault) {
      this.defaultCard = card;
    }

    this.cards.push(card);
  }

  getDefaultCard(): Card {
    return this.defaultCard;
  }

  updateDefaultCard(card: Card): void {
    if (!this.cards || !this.getCard(card.token))
      throw new DomainException('Cartão não cadastrado');

    this.defaultCard = card;
  }

  getCard(token: string): Card {
    return this.cards?.find(c => c.token === token) ?? null;
  }

  equals(entity: IEntity): boolean {
    return entity instanceof Customer && this.cpf.equals(entity.cpf);
  }
}
