import { Field, InputType, Int } from 'type-graphql';

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

  @Field(() => Number, { nullable: true })
  brand: number;
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

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => Number, { nullable: true })
  brand: number;
}
