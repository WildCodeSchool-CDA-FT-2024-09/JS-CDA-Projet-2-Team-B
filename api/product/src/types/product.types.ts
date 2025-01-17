import { Field, InputType, Int } from 'type-graphql';
import { CharacteristicValueInput } from './characteristic.types';
import { CharacteristicValueUpdateInput } from './characteristic.types';

@InputType()
export class ProductInput {
  @Field()
  reference: string;

  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => Boolean)
  isPublished: boolean;

  @Field(() => Number, { nullable: true })
  brand: number;

  @Field(() => [CharacteristicValueInput], { nullable: true })
  characteristicValues?: CharacteristicValueInput[];
}

@InputType()
export class ProductUpdateInput {
  @Field()
  id: number;

  @Field()
  reference: string;

  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => Boolean)
  isPublished: boolean;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => Number, { nullable: true })
  brand: number;

  @Field(() => [CharacteristicValueUpdateInput], { nullable: true })
  characteristicValues?: CharacteristicValueUpdateInput[];

  // @Field(() => [Number])
  // imageIds?: number[];
}
