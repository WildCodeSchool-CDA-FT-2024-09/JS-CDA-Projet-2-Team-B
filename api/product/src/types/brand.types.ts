import { IsDateString, IsNumber, IsString, Length } from 'class-validator';
import { Brand } from '../entity/brand.entities';
import { Field, InputType } from 'type-graphql';

@InputType()
export class BrandCreationInput implements Partial<Brand> {
  @Field({ nullable: false })
  @Length(1, 50)
  @IsString()
  name: string;

  @Field({ nullable: false })
  @Length(1, 255)
  @IsString()
  description: string;
}

@InputType()
export class BrandUpdateInput implements Partial<Brand> {
  @Field()
  @IsNumber()
  id: number;

  @Field({ nullable: true })
  @Length(1, 50)
  @IsString()
  name: string;

  @Field({ nullable: true })
  @Length(1, 255)
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsDateString()
  deletedAt?: Date;
}
