import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './product.entities';

@ObjectType()
@Entity('image')
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  url: string;

  @Field()
  @Column({ name: 'ismain', default: false })
  isMain: boolean;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.images)
  products?: Product[];
}
