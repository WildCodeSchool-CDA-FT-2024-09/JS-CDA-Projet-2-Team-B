import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { GraphQLDateTime } from 'graphql-scalars';

@ObjectType()
@Entity('categories')
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50 })
  @Length(1, 50)
  name: string;

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
