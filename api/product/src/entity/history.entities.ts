import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './user.entities';
import { Action } from './action.entities';
import { Product } from './product.entities';
import { Brand } from './brand.entities';

@ObjectType()
@Entity('history')
export class History extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.histories)
  user: User;

  @Column()
  userId: number;

  @Field(() => Action)
  @ManyToOne(() => Action, (action) => action.histories)
  action: Action;

  @Column()
  actionId: number;

  @Field(() => Product)
  @ManyToOne(() => Product)
  product: Product;

  @Column()
  productId: number;

  @Field(() => Brand)
  @ManyToOne(() => Brand, (brand) => brand.histories)
  brand: Brand;

  @Column()
  brandId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
