import { Field, InputType, Int } from 'type-graphql';
import { CharacteristicValueInput } from './characteristic.types';
import { CharacteristicValueUpdateInput } from './characteristic.types';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

@InputType()
export class ProductInput {
  @Field()
  @IsString()
  @Length(11, 17)
  reference: string;

  @Field()
  @IsString()
  @Length(1, 50)
  name: string;

  @Field()
  @IsString()
  @Length(1, 255)
  shortDescription: string;

  @Field()
  @IsString()
  @Length(1, 2000)
  description: string;

  @Field()
  @IsNumber()
  price: number;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => Boolean)
  @IsBoolean()
  isPublished: boolean;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  brand: number;

  @Field(() => [CharacteristicValueInput], { nullable: true })
  characteristicValues?: CharacteristicValueInput[];
}

@InputType()
export class ProductUpdateInput {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  @Length(11, 17)
  reference: string;

  @Field()
  @IsString()
  @Length(1, 50)
  name: string;

  @Field()
  @IsString()
  @Length(1, 255)
  shortDescription: string;

  @Field()
  @IsString()
  @Length(1, 2000)
  description: string;

  @Field()
  @IsNumber()
  price: number;

  @Field(() => Boolean)
  @IsBoolean()
  isPublished: boolean;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => Number, { nullable: true })
  @IsNumber()
  brand: number;

  @Field(() => [CharacteristicValueUpdateInput], { nullable: true })
  characteristicValues?: CharacteristicValueUpdateInput[];
}
