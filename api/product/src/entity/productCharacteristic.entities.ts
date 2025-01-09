import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Product } from './product.entities';
import { Characteristic } from './characteristic.entities';

@ObjectType()
@Entity('product_characteristic_values')
export class ProductCharacteristic extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  value: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.characteristicValues)
  product: Product;

  @Column()
  productId: number;

  @Field(() => Characteristic)
  @ManyToOne(() => Characteristic)
  characteristic: Characteristic;

  @Column()
  characteristicId: number;
}
