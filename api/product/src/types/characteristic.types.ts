import { IsNumber, IsString, Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CharacteristicInput {
  @Field({ nullable: true })
  @IsNumber()
  id?: number;

  @Field()
  @IsString()
  @Length(1, 100)
  name: string;
}

@InputType()
export class CharacteristicValueInput {
  @Field(() => Int)
  @IsNumber()
  characteristicId: number;

  @Field()
  @IsString()
  @Length(1, 100)
  value: string;
}

@InputType()
export class CharacteristicValueUpdateInput {
  @Field(() => Int)
  @IsNumber()
  characteristicId: number;

  @Field()
  @IsString()
  @Length(1, 100)
  value: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  productCharacteristicId?: number;
}
