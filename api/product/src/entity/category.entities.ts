import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
@Entity('categories')
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50, nullable: true })
  @Length(1, 50)
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;
}
