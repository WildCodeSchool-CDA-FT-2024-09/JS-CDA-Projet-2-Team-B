import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Product } from './product.entities';
import { CharacteristicDefinition } from './characteristicDefinition.entities';

@ObjectType()
@Entity('productCharacteristics')
export class ProductCharacteristic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  value: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.characteristics)
  product: Product;

  @Column()
  productId: number;

  @Field(() => CharacteristicDefinition)
  @ManyToOne(
    () => CharacteristicDefinition,
    (definition) => definition.characteristics
  )
  definition: CharacteristicDefinition;

  @Column()
  definitionId: number;
}
