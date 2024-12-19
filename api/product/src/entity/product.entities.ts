import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';
import { Length, Min } from 'class-validator';
import { Category } from './category.entities';
import { Brand } from './brand.entities';
import { GraphQLDateTime } from 'graphql-scalars';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Field()
  @Column({ unique: true, length: 50, nullable: true })
  @Length(1, 50)
  reference: string;

  @Field()
  @Column({ length: 255, nullable: true })
  @Length(1, 255)
  name: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  shortDescription: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Min(0)
  price: number;

  @Field(() => Boolean)
  @Column({ default: true })
  isPublished: boolean;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category)
  @JoinTable()
  categories?: Category[];

  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, (brand) => brand.id)
  brand: Brand;

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
