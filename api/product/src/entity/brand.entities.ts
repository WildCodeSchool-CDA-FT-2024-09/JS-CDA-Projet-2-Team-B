import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entities';

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

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.brand)
  products?: Product[];
}
