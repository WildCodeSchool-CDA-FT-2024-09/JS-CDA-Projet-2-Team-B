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
import { Image } from '../entity/image.entities';
import { In } from 'typeorm';

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

  @Field(() => [Int])
  imageIds: number[];
}

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts(
    @Arg('search', { nullable: true }) search: string
  ): Promise<Product[]> {
    const existingProducts = await Product.find({
      where: { reference: search },
      relations: {
        images: true
      }
    });
    return existingProducts;
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

    if (newProduct.imageIds && newProduct.imageIds.length > 0) {
      const images = await Image.findBy({ id: In(newProduct.imageIds) });

      if (images.length !== newProduct.imageIds.length) {
        throw new Error("Certains IDs d'image sont invalides ou inexistants.");
      }
      product.images = images;
    }

    return await product.save();
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('id', () => Int) id: number
  ): Promise<Product | null> {
    return await Product.findOne({ where: { id }, relations: ['images'] });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('data') newDataProduct: ProductUpdateInput
  ): Promise<Product> {
    const { id } = newDataProduct;

    const product = await Product.findOne({
      where: { id },
      relations: ['images']
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Using assign method from Object to assign new data to the found product.
    Object.assign(product, newDataProduct);

    if (newDataProduct.imageIds && newDataProduct.imageIds.length > 0) {
      const images = await Image.findBy({ id: In(newDataProduct.imageIds) });

      product.images = images;
    }

    return await product.save();
  }
}
