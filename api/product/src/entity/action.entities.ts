import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { History } from './history.entities';

@ObjectType()
@Entity('actions')
export class Action extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  @Length(1, 100)
  name: string;

  @Field(() => [History], { nullable: true })
  @OneToMany(() => History, (history) => history.action)
  histories?: History[];
}
