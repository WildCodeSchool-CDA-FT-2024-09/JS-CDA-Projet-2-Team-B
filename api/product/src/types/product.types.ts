import { Field, InputType, Int } from 'type-graphql';
import { CharacteristicValueInput } from './characteristic.types';
import { CharacteristicValueUpdateInput } from './characteristic.types';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

@InputType()
export class ProductInput {
  @Field({ nullable: false })
  @IsString()
  @Length(11, 13)
  reference: string;

  @Field({ nullable: false })
  @IsString()
  @Length(1, 255)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @Length(1, 255)
  shortDescription: string;

  @Field({ nullable: true })
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsNumber()
  price: number;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => Boolean, { nullable: true })
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
  @Field({ nullable: false })
  @IsNumber()
  id: number;

  @Field({ nullable: false })
  @IsString()
  @Length(11, 13)
  reference: string;

  @Field({ nullable: false })
  @IsString()
  @Length(1, 255)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @Length(1, 255)
  shortDescription: string;

  @Field({ nullable: true })
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsNumber()
  price: number;

  @Field(() => Boolean, { nullable: true })
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
