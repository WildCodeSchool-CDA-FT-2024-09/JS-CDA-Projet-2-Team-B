import { IsNumber } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CharacteristicInput {
  @Field({ nullable: true })
  @IsNumber()
  id?: number;

  @Field()
  name: string;
}

@InputType()
export class CharacteristicValueInput {
  @Field(() => Int)
  characteristicId: number;

  @Field()
  value: string;
}
