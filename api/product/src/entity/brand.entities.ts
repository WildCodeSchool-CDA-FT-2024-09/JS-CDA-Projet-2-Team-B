import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entities';
import { GraphQLDateTime } from 'graphql-scalars';

@ObjectType()
@Entity('brand')
export class Brand extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ nullable: true })
  logo: string;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.brand)
  products?: Product[];

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
