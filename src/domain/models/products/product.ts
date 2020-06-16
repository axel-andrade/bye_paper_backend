import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IEntity } from '../shared/IEntity';

@Entity({
  name: 'products'
})

export class Product implements IEntity{

  constructor(title: string, description: string, id?: number) {
    this.title = title;
    this.description = description;
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  id?: number

  @Column({length: 80 })
  title: string

  @Column('text')
  description: string

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt?: Date;

  equals(entity: IEntity): boolean {
    if(!(entity instanceof Product)) {
      return false;
    }
    return this.id === entity.id;
  }
}
