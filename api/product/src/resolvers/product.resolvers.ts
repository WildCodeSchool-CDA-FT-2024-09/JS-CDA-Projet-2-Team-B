import { Product } from '../entity/product.entities';
import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';

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
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return Product.find();
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

  @Query(() => Product, { nullable: true })
  async getProductById(@Arg('id', () => Number) id: number) {
    return await Product.findOne({ where: { id } });
  }
}
