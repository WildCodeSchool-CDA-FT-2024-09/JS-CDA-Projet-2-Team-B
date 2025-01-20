import { ProductInput, ProductUpdateInput } from '../types/product.types';
import { Product } from '../entity/product.entities';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { Category } from '../entity/category.entities';
import { ILike, In } from 'typeorm';
import { Brand } from '../entity/brand.entities';
import { ProductCharacteristic } from '../entity/productCharacteristic.entities';
import { Characteristic } from '../entity/characteristic.entities';
import { Tag } from '../entity/tag.entities';
import redisClient from '../redis.config';

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async getAllProducts(
    @Arg('search', { nullable: true }) search: string,
    @Arg('brands', () => [String], { nullable: true }) brands: string[],
    @Arg('includeDeleted', () => Boolean, { nullable: true })
    includeDeleted = false
  ): Promise<Product[]> {
    const cacheKey = `products:${search || 'all'}:${brands?.join(',') || 'all'}:${includeDeleted}`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }

    const query = {
      where: {
        ...(search && { name: ILike(`%${search}%`) }),
        ...(brands && brands.length > 0 && { brand: { name: In(brands) } })
      },
      relations: {
        categories: true,
        brand: true,
        images: true,
        characteristicValues: {
          characteristic: true
        },
        tags: true
      },
      withDeleted: includeDeleted
    };

    const result = await Product.find(query);

    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });

    return result;
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

    if (newProduct.tagIds) {
      const tags = await Tag.findBy({
        id: In(newProduct.tagIds)
      });
      product.tags = tags;
    }

    await product.save();
    await redisClient.flushAll();

    if (newProduct.characteristicValues?.length) {
      const characteristicValues = await Promise.all(
        newProduct.characteristicValues.map(async (char) => {
          const characteristicDef = await Characteristic.findOneByOrFail({
            id: char.characteristicId
          });

          const characteristicValue = new ProductCharacteristic();
          characteristicValue.product = product;
          characteristicValue.characteristic = characteristicDef;
          characteristicValue.value = char.value;
          return characteristicValue.save();
        })
      );
      product.characteristicValues = characteristicValues;
    }

    return product;
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('id', () => Int) id: number,
    @Arg('includeDeleted', () => Boolean, { nullable: true })
    includeDeleted = false
  ): Promise<Product | null> {
    return await Product.findOne({
      where: { id },
      relations: [
        'categories',
        'brand',
        'images',
        'tags',
        'characteristicValues',
        'characteristicValues.characteristic'
      ],
      withDeleted: includeDeleted
    });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('data') newDataProduct: ProductUpdateInput
  ): Promise<Product> {
    const { id } = newDataProduct;

    const product = await Product.findOne({
      where: { id },
      relations: [
        'categories',
        'brand',
        'images',
        'characteristicValues',
        'characteristicValues.characteristic',
        'tags'
      ]
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

    if (newDataProduct.tagIds) {
      const tags = await Tag.findBy({
        id: In(newDataProduct.tagIds)
      });
      product.tags = tags;
    }

    // if (newDataProduct.imageIds && newDataProduct.imageIds.length > 0) {
    //   const images = await Image.findBy({ id: In(newDataProduct.imageIds) });

    //   product.images = images;
    // }

    // Gestion des caractéristiques
    if (newDataProduct.characteristicValues) {
      // 1. Vérifier les doublons dans les données d'entrée
      const characteristicIds = newDataProduct.characteristicValues.map(
        (char) => char.characteristicId
      );
      const uniqueIds = new Set(characteristicIds);

      if (uniqueIds.size !== characteristicIds.length) {
        throw new Error(
          'Une caractéristique ne peut être ajoutée plusieurs fois pour un même produit'
        );
      }

      // 2. Récupérer les caractéristiques existantes
      const existingCharacteristics = await ProductCharacteristic.find({
        where: { product: { id: product.id } },
        relations: ['characteristic']
      });

      // 3. Mise à jour des caractéristiques
      const updatedCharacteristics = await Promise.all(
        newDataProduct.characteristicValues.map(async (newChar) => {
          // Chercher si la caractéristique existe déjà
          const existing = existingCharacteristics.find(
            (ec) => ec.characteristic.id === newChar.characteristicId
          );

          if (existing) {
            // Mettre à jour la valeur
            existing.value = newChar.value;
            return existing.save();
          } else {
            // Créer une nouvelle caractéristique
            const characteristic = await Characteristic.findOne({
              where: { id: newChar.characteristicId }
            });

            if (!characteristic) {
              throw new Error(
                `Characteristic with id ${newChar.characteristicId} not found`
              );
            }

            return ProductCharacteristic.create({
              product,
              characteristic,
              value: newChar.value
            }).save();
          }
        })
      );

      // 4. Supprimer les caractéristiques qui ne sont plus dans la liste
      if (existingCharacteristics.length > 0) {
        const characteristicsToRemove = existingCharacteristics.filter(
          (existing) =>
            !newDataProduct.characteristicValues?.some(
              (newChar) =>
                newChar.characteristicId === existing.characteristic.id
            )
        );

        if (characteristicsToRemove.length > 0) {
          await ProductCharacteristic.remove(characteristicsToRemove);
        }
      }

      product.characteristicValues = updatedCharacteristics;
    }

    await product.save();
    await redisClient.flushAll();

    return product;
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

  @Mutation(() => Product)
  async restoreProduct(@Arg('id', () => Int) id: number): Promise<Product> {
    try {
      const product = await Product.findOne({
        where: { id },
        withDeleted: true,
        relations: {
          brand: true,
          categories: true,
          tags: true
        }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      await product.recover();
      return product;
    } catch (error) {
      console.error('Error restoring Tag:', error);
      throw error;
    }
  }
}
