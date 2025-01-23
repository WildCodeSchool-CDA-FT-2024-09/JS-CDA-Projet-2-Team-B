import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';
import { Image } from './image.entities';
import { Category } from './category.entities';
import { Brand } from './brand.entities';
import { GraphQLDateTime } from 'graphql-scalars';
import { ProductCharacteristic } from './productCharacteristic.entities';
import { Tag } from './tag.entities';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Field()
  @Column({ unique: true, length: 13, nullable: false })
  reference: string;

  @Field()
  @Column({ length: 255, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  shortDescription: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  description: string;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
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

  @Field(() => [ProductCharacteristic], { nullable: true })
  @OneToMany(
    () => ProductCharacteristic,
    (characteristicValue) => characteristicValue.product
  )
  characteristicValues: ProductCharacteristic[];

  @Field(() => GraphQLDateTime, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
