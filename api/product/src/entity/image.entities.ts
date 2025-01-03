import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from './product.entities';
import { Brand } from './brand.entities';

@ObjectType()
@Entity('image')
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  url: string;

  @Field()
  @Column({ name: 'ismain', default: false })
  isMain: boolean;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.images)
  products?: Product[];

  @Field(() => Brand, { nullable: true })
  @OneToOne(() => Brand, (brand) => brand.image)
  brand: Brand;
}
