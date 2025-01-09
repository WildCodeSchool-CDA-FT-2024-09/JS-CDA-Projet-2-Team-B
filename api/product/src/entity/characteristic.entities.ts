import { GraphQLDateTime } from 'graphql-scalars';
import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entities';

@ObjectType()
@Entity('characteristics')
export class Characteristic extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ unique: true, length: 100 })
  name: string;

  @Field(() => [Product], { nullable: true })
  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_characteristics',
    joinColumn: { name: 'characteristicId' },
    inverseJoinColumn: { name: 'productId' }
  })
  products?: Product[];

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedDate?: Date;
}
