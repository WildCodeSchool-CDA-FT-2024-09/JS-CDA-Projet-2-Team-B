import { Product } from '../entity/product.entities';
import { Resolver, Query } from 'type-graphql';

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return Product.find({
      relations: ['brand', 'images', 'characteristics']
    });
  }
}
