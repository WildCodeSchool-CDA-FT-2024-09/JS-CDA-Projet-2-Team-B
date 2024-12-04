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

  @Field(() => CharacteristicDefinition, { nullable: true })
  @ManyToOne(
    () => CharacteristicDefinition,
    (definition) => definition.characteristics,
    { nullable: true }
  )
  definition?: CharacteristicDefinition;

  @Column({ nullable: true })
  definitionId: number;
}
