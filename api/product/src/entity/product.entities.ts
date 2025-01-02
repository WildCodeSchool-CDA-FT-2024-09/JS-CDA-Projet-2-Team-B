import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';
import { Length, Min } from 'class-validator';
import { Image } from './image.entities';
import { Category } from './category.entities';
import { Brand } from './brand.entities';
import { GraphQLDateTime } from 'graphql-scalars';
import { Tag } from './tag.entities';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Field()
  @Column({ unique: true, length: 50, nullable: true })
  @Length(1, 50)
  reference: string;

  @Field()
  @Column({ length: 255, nullable: true })
  @Length(1, 255)
  name: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  shortDescription: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Min(0)
  price: number;

  @Field(() => [Image])
  @ManyToMany(() => Image, (image) => image.products)
  @JoinTable({
    name: 'products_images',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'image_id', referencedColumnName: 'id' }
  })
  images?: Image[];

  @Field(() => Boolean)
  @Column({ default: true })
  isPublished: boolean;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category)
  @JoinTable()
  categories?: Category[];

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags?: Tag[];

  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, (brand) => brand.id)
  brand: Brand;

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
