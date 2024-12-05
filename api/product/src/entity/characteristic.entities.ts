import { ObjectType, Field, ID } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('characteristics')
export class Characteristic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: true })
  value?: string;
}
