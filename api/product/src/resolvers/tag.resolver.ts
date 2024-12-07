import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Tag } from '../entity/tag.entities';
import { CreateTagInput } from '../types/tag.types';

@Resolver(Tag)
export default class TagResolver {
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    try {
      return await Tag.find();
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
}
