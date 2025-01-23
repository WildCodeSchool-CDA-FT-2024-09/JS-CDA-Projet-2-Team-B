import { InputType, Field } from 'type-graphql';
import { IsNumber, IsString, Length } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field()
  @IsString()
  @Length(1, 50, {
    message: 'Le nom du tag doit faire entre 1 et 50 caractères'
  })
  name: string;
}

@InputType()
export class UpdateTagInput {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @Length(1, 50)
  @IsString()
  name: string;
}
