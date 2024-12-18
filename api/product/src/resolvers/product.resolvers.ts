import { ProductUpdateInput } from '../types/product.types';
import { Product } from '../entity/product.entities';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int
} from 'type-graphql';
import { Category } from '../entity/category.entities';
import { ILike, In } from 'typeorm';

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

  @Field({ defaultValue: true })
  isPublished: boolean;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];
}

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts(
    @Arg('search', { nullable: true }) search: string
  ): Promise<Product[]> {
    const query = {
      where: search ? { name: ILike(`%${search}%`) } : {},
      relations: {
        categories: true
      }
    };

    return Product.find(query);
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

    const product = new Product();
    product.reference = newProduct.reference;
    product.name = newProduct.name;
    product.shortDescription = newProduct.shortDescription;
    product.description = newProduct.description;
    product.price = newProduct.price;
    product.isPublished = newProduct.isPublished;

    if (newProduct.categoryIds) {
      const categories = await Category.findBy({
        id: In(newProduct.categoryIds)
      });
      product.categories = categories;
    }

    return await product.save();
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('id', () => Int) id: number
  ): Promise<Product | null> {
    return await Product.findOne({
      where: { id },
      relations: ['categories']
    });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('data') newDataProduct: ProductUpdateInput
  ): Promise<Product> {
    const { id } = newDataProduct;

    const product = await Product.findOne({
      where: { id },
      relations: ['categories']
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Using assign method from Object to assign new data to the found product.
    Object.assign(product, newDataProduct);

    if (newDataProduct.categoryIds) {
      const categories = await Category.findBy({
        id: In(newDataProduct.categoryIds)
      });
      product.categories = categories;
    }

    return await product.save();
  }
}
