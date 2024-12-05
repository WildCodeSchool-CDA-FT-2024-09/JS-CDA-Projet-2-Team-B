import { Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Category } from '../entity/category.entities';

@InputType()
export class CreateCategoryInput {
  @Field()
  @Length(1, 50)
  name: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field()
  id: number;

  @Field()
  @Length(1, 50)
  name: string;
}

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    return await Category.find();
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg('input') input: CreateCategoryInput
  ): Promise<Category> {
    try {
      const existingCategory = await Category.findOne({
        where: { name: input.name }
      });

      if (existingCategory) {
        throw new Error('Une catégorie avec ce nom existe déjà');
      }

      const category = new Category();
      category.name = input.name;
      await category.save();

      return category;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création de la catégorie: ${error.message}`
      );
    }
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('input') input: UpdateCategoryInput
  ): Promise<Category> {
    try {
      const category = await Category.findOne({ where: { id: input.id } });

      if (!category) {
        throw new Error('Catégorie non trouvée');
      }

      const existingCategory = await Category.findOne({
        where: { name: input.name }
      });

      if (existingCategory) {
        throw new Error('Une autre catégorie avec ce nom existe déjà');
      }

      category.name = input.name;
      await category.save();

      return category;
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour de la catégorie: ${error.message}`
      );
    }
  }
}
