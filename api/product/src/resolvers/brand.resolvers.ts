import { ILike } from 'typeorm';
import { Brand } from '../entity/brand.entities';
import { BrandCreationInput } from '../types/brand.types';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export default class BrandResolver {
  @Query(() => [Brand])
  async getAllBrands(
    @Arg('search', { nullable: true }) search: string
  ): Promise<Brand[]> {
    const query = {
      where: search ? { name: ILike(`%${search}%`) } : {}
    };

    return Brand.find(query);
  }

  @Query(() => Brand, { nullable: true })
  async getBrandById(@Arg('id', () => Int) id: number): Promise<Brand | null> {
    return await Brand.findOne({
      where: { id }
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
}
