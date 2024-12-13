import { Brand } from '../entity/brand.entities';
import { BrandCreationInput, BrandUpdateInput } from '../types/brand.types';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export default class BrandResolver {
  @Query(() => [Brand])
  async getAllBrands(): Promise<Brand[]> {
    return await Brand.find();
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
}
