import { Length } from 'class-validator';
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver
} from 'type-graphql';
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
  async getAllCategories(
    @Arg('includeDeleted', () => Boolean, { nullable: true })
    includeDeleted = false
  ): Promise<Category[]> {
    return await Category.find({
      withDeleted: includeDeleted,
      order: {
        name: 'ASC'
      }
    });
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

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const category = await Category.findOne({
        where: { id }
      });

      if (!category) {
        throw new Error('Category not found');
      }

      await category.softRemove();

      return true;
    } catch (error) {
      console.error('Error while deleting category:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async restoreCategory(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const category = await Category.findOne({
        where: { id },
        withDeleted: true
      });

      if (!category) {
        throw new Error('Category not found');
      }

      await category.recover();
      return true;
    } catch (error) {
      console.error('Error restoring category:', error);
      throw error;
    }
  }
}
