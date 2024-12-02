import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { History } from './history.entities';
import { Exchange } from './exchange.entities';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  @Length(1, 100)
  lastName: string;

  @Field()
  @Column({ length: 100 })
  @Length(1, 100)
  firstName: string;

  @Field()
  @Column({ unique: true, length: 255 })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 20 })
  phone?: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @Field(() => [History], { nullable: true })
  @OneToMany(() => History, (history) => history.user)
  histories?: History[];

  @Field(() => [Exchange], { nullable: true })
  @OneToMany(() => Exchange, (exchange) => exchange.user)
  exchanges?: Exchange[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
