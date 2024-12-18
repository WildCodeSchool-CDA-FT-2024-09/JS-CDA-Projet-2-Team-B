import { GraphQLDateTime } from 'graphql-scalars';
import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity('characteristics')
export class Characteristic extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 100 })
  name: string;

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedDate?: Date;
}
