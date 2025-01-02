import { ProductInput, ProductUpdateInput } from '../types/product.types';
import { Product } from '../entity/product.entities';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { Category } from '../entity/category.entities';
import { ILike, In } from 'typeorm';
import { Brand } from '../entity/brand.entities';

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts(
    @Arg('search', { nullable: true }) search: string
  ): Promise<Product[]> {
    const query = {
      where: search ? { name: ILike(`%${search}%`) } : {},
      relations: {
        categories: true,
        brand: true,
        images: true
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

    const brand = await Brand.findOne({ where: { id: newProduct.brand } });

    if (!brand) {
      throw new Error(`La marque ${newProduct.brand} n'existe pas.`);
    }

    product.brand = brand;
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
      relations: ['categories', 'brand', 'images']
    });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('data') newDataProduct: ProductUpdateInput
  ): Promise<Product> {
    const { id } = newDataProduct;

    const product = await Product.findOne({
      where: { id },
      relations: ['categories', 'brand', 'images']
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Using assign method from Object to assign new data to the found product.
    Object.assign(product, newDataProduct);

    if (newDataProduct.brand) {
      const brand = await Brand.findOne({
        where: { id: newDataProduct.brand }
      });

      if (!brand) {
        throw new Error(`La marque ${newDataProduct.brand} n'existe pas.`);
      }

      product.brand = brand;
    }

    if (newDataProduct.categoryIds) {
      const categories = await Category.findBy({
        id: In(newDataProduct.categoryIds)
      });
      product.categories = categories;
    }

    // if (newDataProduct.imageIds && newDataProduct.imageIds.length > 0) {
    //   const images = await Image.findBy({ id: In(newDataProduct.imageIds) });

    //   product.images = images;
    // }

    return await product.save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const product = await Product.findOne({
        where: { id }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      await product.softRemove();

      return true;
    } catch (error) {
      console.error('Error while deleting product:', error);
      throw error;
    }
  }
}
