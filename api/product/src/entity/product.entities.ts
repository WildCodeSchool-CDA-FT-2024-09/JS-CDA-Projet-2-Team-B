import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID, Float } from 'type-graphql';
import { Length, Min } from 'class-validator';
import { Brand } from './brand.entities';
import { Image } from './image.entities';
import { Contact } from './contact.entities';
import { Tag } from './tag.entities';
import { Category } from './category.entities';
import { ProductCharacteristic } from './productCharacteristic.entities';

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

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  status?: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  label?: string;

  @Field(() => Brand)
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @Column()
  brandId: number;

  @Field(() => [Contact], { nullable: true })
  @OneToMany(() => Contact, (contact) => contact.product)
  contacts?: Contact[];

  @Field(() => [ProductCharacteristic], { nullable: true })
  @OneToMany(
    () => ProductCharacteristic,
    (characteristic) => characteristic.product
  )
  characteristics?: ProductCharacteristic[];

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'products_tags',
    joinColumn: { name: 'productId' },
    inverseJoinColumn: { name: 'tagId' }
  })
  tags?: Tag[];

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category)
  @JoinTable({
    name: 'products_categories',
    joinColumn: { name: 'productId' },
    inverseJoinColumn: { name: 'categoryId' }
  })
  categories?: Category[];

  @Field(() => [Image], { nullable: true })
  @OneToMany(() => Image, (image) => image.product)
  images?: Image[];

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
