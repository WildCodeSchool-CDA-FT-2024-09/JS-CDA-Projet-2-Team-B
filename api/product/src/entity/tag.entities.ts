import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
@Entity('tags')
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50 })
  @Length(1, 50)
  name: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;
}
