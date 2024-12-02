import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ProductUpdateInput } from '../types/product.types';
import { Product } from '../entity/product.entities';

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts() {
    return [];
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('data') newDataProduct: ProductUpdateInput
  ): Promise<Product> {
    const { id } = newDataProduct;

    const product = await Product.findOne({
      where: { id }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Using assign method from Object to assign new data to the found product.
    Object.assign(product, newDataProduct);

    await product.save();

    const updatedProduct = await Product.findOne({
      where: { id }
    });

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  }
}
