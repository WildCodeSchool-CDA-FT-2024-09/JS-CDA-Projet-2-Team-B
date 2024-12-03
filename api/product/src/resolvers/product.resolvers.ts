import { Resolver, Query, InputType, Field, Mutation, Arg } from 'type-graphql';
import { Product } from '../entity/product.entities';

@InputType()
class ProductInput {
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
}

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

  @Mutation(() => Product)
  async createNewProduct(
    @Arg('data') newProduct: ProductInput
  ): Promise<Product> {
    const existingProduct = await Product.findOne({
      where: { reference: newProduct.reference }
    });
    if (existingProduct) {
      throw new Error(
        `A product with the reference "${newProduct.reference}" already exists.`
      );
    }

    const product = Product.create({
      reference: newProduct.reference,
      name: newProduct.name,
      shortDescription: newProduct.shortDescription,
      description: newProduct.description,
      price: newProduct.price
    });

    await product.save();
    return product;
  }
}

export default ProductResolver;
