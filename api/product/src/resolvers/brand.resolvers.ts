import { ILike } from 'typeorm';
import { Brand } from '../entity/brand.entities';
import { BrandCreationInput, BrandUpdateInput } from '../types/brand.types';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export default class BrandResolver {
  @Query(() => [Brand])
  async getAllBrands(
    @Arg('search', { nullable: true }) search: string,
    @Arg('includeDeleted', () => Boolean, { nullable: true })
    includeDeleted = false
  ): Promise<Brand[]> {
    const query = {
      where: search ? { name: ILike(`%${search}%`) } : {},
      withDeleted: includeDeleted,
      relations: ['image']
    };

    return Brand.find(query);
  }

  @Query(() => Brand, { nullable: true })
  async getBrandById(
    @Arg('id', () => Int) id: number,
    @Arg('includeDeleted', () => Boolean, { nullable: true })
    includeDeleted = false
  ): Promise<Brand | null> {
    return await Brand.findOne({
      where: { id },
      withDeleted: includeDeleted,
      relations: ['image']
    });
  }

  @Mutation(() => Brand)
  async createBrand(
    @Arg('data') newBrandData: BrandCreationInput
  ): Promise<Brand> {
    const checkIfExists = await Brand.findOne({
      where: { name: newBrandData.name }
    });

    if (checkIfExists) {
      throw new Error(`La marque ${newBrandData.name} existe déjà.`);
    }

    const newBrand = new Brand();

    Object.assign(newBrand, newBrandData);

    return newBrand.save();
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Arg('data') newDataBrand: BrandUpdateInput
  ): Promise<Brand> {
    const { id } = newDataBrand;

    const brand = await Brand.findOne({
      where: {
        id
      }
    });

    if (!brand) {
      throw new Error(`La marque avec l'id ${id} est introuvable.`);
    }

    Object.assign(brand, newDataBrand);

    return await brand.save();
  }

  @Mutation(() => Boolean)
  async deactivateBrand(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const brand = await Brand.findOne({
        where: { id }
      });

      if (!brand) {
        throw new Error(`La marque avec l'id ${id} n'a pas été trouvée.`);
      }

      await brand.softRemove();

      return true;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de la marque ayant pour id : ${id}`,
        error
      );
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async activateBrand(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const brand = await Brand.findOne({
        where: { id },
        withDeleted: true
      });

      if (!brand) {
        throw new Error("La marque n'a pas été trouvée.");
      }

      await brand.recover();
      return true;
    } catch (error) {
      console.error('Erreur lors de la restauration de la marque : ', error);
      throw error;
    }
  }
}
