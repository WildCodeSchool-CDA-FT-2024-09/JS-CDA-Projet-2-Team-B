import { Resolver, Query } from 'type-graphql';
import { Product } from '../entity/product.entities';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await Product.find({
      relations: {
        brand: true,
        contacts: true,
        characteristics: {
          definition: true
        },
        tags: true,
        categories: true,
        images: true
      }
    });
  }

  @Query(() => Product, { nullable: true })
  async product(id: number): Promise<Product | null> {
    // Récupère un produit spécifique avec ses relations
    return await Product.findOne({
      where: { id },
      relations: {
        brand: true,
        images: true,
        characteristics: true
      }
    });
  }
}

export default ProductResolver;
