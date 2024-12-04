import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Product } from './product.entities';

@ObjectType()
@Entity('images')
export class Image extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  @Length(1, 255)
  url: string;

  @Field()
  @Column({ length: 255 })
  @Length(1, 255)
  altText: string;

  @Field()
  @Column({ default: false })
  isPrimary: boolean;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Column()
  productId: number;
}
