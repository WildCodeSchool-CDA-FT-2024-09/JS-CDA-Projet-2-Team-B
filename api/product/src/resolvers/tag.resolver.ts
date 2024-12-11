import { Resolver, Mutation, Arg, Query, Int } from 'type-graphql';
import { Tag } from '../entity/tag.entities';
import { CreateTagInput, UpdateTagInput } from '../types/tag.types';

@Resolver(Tag)
export default class TagResolver {
  @Query(() => [Tag])
  async getAllTags(
    @Arg('includeDeleted', () => Boolean, { nullable: true })
    includeDeleted = false
  ): Promise<Tag[]> {
    try {
      return await Tag.find({
        withDeleted: includeDeleted
      });
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des tags: ${error.message}`
      );
    }
  }

  @Mutation(() => Tag)
  async createTag(@Arg('input') input: CreateTagInput): Promise<Tag> {
    try {
      const existingTag = await Tag.findOne({
        where: { name: input.name }
      });

      if (existingTag) {
        throw new Error(`Un tag avec le nom "${input.name}" existe déjà`);
      }

      const tag = new Tag();
      tag.name = input.name;
      await tag.save();

      return tag;
    } catch (error) {
      throw new Error(`Erreur lors de la création du tag: ${error.message}`);
    }
  }

  @Mutation(() => Tag)
  async updateTag(@Arg('input') input: UpdateTagInput): Promise<Tag> {
    try {
      const tag = await Tag.findOne({ where: { id: input.id } });

      if (!tag) {
        throw new Error('Tag non trouvée');
      }

      const existingCategory = await Tag.findOne({
        where: { name: input.name }
      });

      if (existingCategory) {
        throw new Error('Un autre tag avec ce nom existe déjà');
      }

      tag.name = input.name;
      await tag.save();

      return tag;
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour de la catégorie: ${error.message}`
      );
    }
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const tag = await Tag.findOne({
        where: { id }
      });

      if (!tag) {
        throw new Error('Tag not found');
      }

      await tag.softRemove();

      return true;
    } catch (error) {
      console.error('Error while deleting tag:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async restoreTag(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      const tag = await Tag.findOne({
        where: { id },
        withDeleted: true
      });

      if (!tag) {
        throw new Error('Tag not found');
      }

      await tag.recover();
      return true;
    } catch (error) {
      console.error('Error restoring Tag:', error);
      throw error;
    }
  }
}
