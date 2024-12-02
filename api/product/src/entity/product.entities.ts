import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Float } from 'type-graphql';
import { Length, Min } from 'class-validator';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50 })
  @Length(1, 50)
  reference: string;

  @Field()
  @Column({ length: 255 })
  @Length(1, 255)
  name: string;

  @Field()
  @Column('text')
  shortDescription: string;

  @Field()
  @Column('text')
  description: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  @Min(0)
  price: number;
}
