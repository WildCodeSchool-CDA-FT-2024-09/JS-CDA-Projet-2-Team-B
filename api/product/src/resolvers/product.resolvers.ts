import product from '../entity/product.entities';
import { Resolver, Query } from 'type-graphql';

@Resolver(product)
export default class ProductResolver {
  @Query(() => [product])
  async products(): Promise<product[]> {
    return product.find({
      relations: ['brand', 'images', 'characteristics']
    });
  }
}
