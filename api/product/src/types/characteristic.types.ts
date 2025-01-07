import { IsNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CharacteristicInput {
  @Field({ nullable: true })
  @IsNumber()
  id?: number;

  @Field()
  name: string;
}
