import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { Brand } from './Brand';
import { Product } from './Product';

@ObjectType()
@Entity('contacts')
export class Contact extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 20 })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100 })
  country?: string;

  @Field(() => Brand)
  @ManyToOne(() => Brand, (brand) => brand.contacts)
  brand: Brand;

  @Column()
  brandId: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.contacts)
  product: Product;

  @Column()
  productId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
