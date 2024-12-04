import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { ProductCharacteristic } from './productCharacteristic.entities';

@ObjectType()
@Entity('characteristicDefinitions')
export class CharacteristicDefinition extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 100 })
  @Length(1, 100)
  name: string;

  @Field(() => [ProductCharacteristic], { nullable: true })
  @OneToMany(
    () => ProductCharacteristic,
    (characteristic) => characteristic.definition
  )
  characteristics?: ProductCharacteristic[];
}
