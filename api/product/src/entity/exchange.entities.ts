import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { User } from './User';
import { Brand } from './Brand';
import { ExchangeStatus } from './enums/ExchangeStatus';

registerEnumType(ExchangeStatus, {
  name: 'ExchangeStatus'
});

@ObjectType()
@Entity('exchanges')
export class Exchange extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  message: string;

  @Field(() => ExchangeStatus)
  @Column({
    type: 'enum',
    enum: ExchangeStatus,
    default: ExchangeStatus.OPEN
  })
  status: ExchangeStatus;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  closedAt?: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.exchanges)
  user: User;

  @Column()
  userId: number;

  @Field(() => Brand)
  @ManyToOne(() => Brand, (brand) => brand.exchanges)
  brand: Brand;

  @Column()
  brandId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
