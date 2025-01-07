import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entities';
import { GraphQLDateTime } from 'graphql-scalars';
import { Image } from './image.entities';

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

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.brand)
  products?: Product[];

  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
