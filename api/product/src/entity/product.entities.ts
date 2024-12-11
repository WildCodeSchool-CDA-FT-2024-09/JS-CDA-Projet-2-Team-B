import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';
import { Length, Min } from 'class-validator';
import { Category } from './category.entities';

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

  @Field()
  @Column('text', { nullable: true })
  shortDescription: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Min(0)
  price: number;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category)
  @JoinTable()
  categories?: Category[];
}
