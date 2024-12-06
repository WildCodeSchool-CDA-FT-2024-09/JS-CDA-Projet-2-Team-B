import { Resolver, Mutation, Arg } from 'type-graphql';
import { Tag } from '../entity/tag.entities';
import { CreateTagInput } from '../types/tag.types';

@Resolver(Tag)
export default class TagResolver {
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
