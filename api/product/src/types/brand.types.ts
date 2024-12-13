import { Brand } from '../entity/brand.entities';
import { Field, InputType } from 'type-graphql';

@InputType()
export class BrandCreationInput implements Partial<Brand> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  logo: string;
}

@InputType()
export class BrandUpdateInput implements Partial<Brand> {
  @Field()
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  logo: string;
}
