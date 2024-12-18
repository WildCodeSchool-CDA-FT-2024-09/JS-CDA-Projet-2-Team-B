import { Product } from '../entity/product.entities';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductUpdateInput implements Partial<Product> {
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

  @Field(() => [Number])
  imageIds?: number[];
}
