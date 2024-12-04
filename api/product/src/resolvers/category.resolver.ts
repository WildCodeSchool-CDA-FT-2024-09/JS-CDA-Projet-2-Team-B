import { Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Category } from '../entity/category.entities';

@InputType()
export class CreateCategoryInput {
  @Field()
  @Length(1, 50)
  name: string;
}

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
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
}
