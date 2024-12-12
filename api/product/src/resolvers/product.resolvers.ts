import { ProductUpdateInput } from '../types/product.types';
import { Product } from '../entity/product.entities';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts(
    @Arg('search', { nullable: true }) search: string
  ): Promise<Product[]> {
    const queryBuilder = Product.createQueryBuilder('product');

    queryBuilder.leftJoinAndSelect('product.images', 'images');

    if (search) {
      queryBuilder.where('LOWER(product.name) LIKE :search', {
        search: `%${search.toLowerCase()}%`
      });
    }

    return queryBuilder.getMany();
  }

  @Mutation(() => Product)
  async createNewProduct(
    @Arg('data') newProduct: ProductUpdateInput
  ): Promise<Product> {
    const existingProduct = await Product.findOne({
      where: { reference: newProduct.reference }
    });
    if (existingProduct) {
      throw new Error(
        `A product with the reference "${newProduct.reference}" already exists.`
      );
    }

    const product = new Product();
    product.reference = newProduct.reference;
    product.name = newProduct.name;
    product.shortDescription = newProduct.shortDescription;
    product.description = newProduct.description;
    product.price = newProduct.price;

    return await product.save();
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('id', () => Int) id: number
  ): Promise<Product | null> {
    return await Product.findOne({ where: { id } });
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

    return await product.save();
  }
}
