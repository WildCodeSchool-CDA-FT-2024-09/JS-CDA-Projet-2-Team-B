import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { GraphQLDateTime } from 'graphql-scalars';

@ObjectType()
@Entity('tags')
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50 })
  name: string;

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
