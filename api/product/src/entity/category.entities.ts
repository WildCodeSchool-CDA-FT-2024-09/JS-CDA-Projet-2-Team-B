import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { GraphQLDateTime } from 'graphql-scalars';
import { Product } from './product.entities';

@ObjectType()
@Entity('categories')
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50 })
  name: string;

  @Field(() => [Product], { nullable: true })
  @ManyToMany(() => Product)
  products?: Product[];

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
