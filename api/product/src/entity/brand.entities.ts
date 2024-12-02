import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Product } from './Product';
import { Contact } from './Contact';
import { Exchange } from './Exchange';
import { History } from './History';

@ObjectType()
@Entity('brands')
export class Brand extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 100 })
  @Length(1, 100)
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  logo?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.brand)
  products?: Product[];

  @Field(() => [Contact], { nullable: true })
  @OneToMany(() => Contact, (contact) => contact.brand)
  contacts?: Contact[];

  @Field(() => [Exchange], { nullable: true })
  @OneToMany(() => Exchange, (exchange) => exchange.brand)
  exchanges?: Exchange[];

  @Field(() => [History], { nullable: true })
  @OneToMany(() => History, (history) => history.brand)
  histories?: History[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
