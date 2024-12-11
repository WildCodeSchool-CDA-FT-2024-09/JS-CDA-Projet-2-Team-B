import { Resolver, Mutation, Arg, Query, InputType, Field } from 'type-graphql';
import { Tag } from '../entity/tag.entities';
import { CreateTagInput } from '../types/tag.types';
import { Length } from 'class-validator';

@InputType()
export class UpdateTagInput {
  @Field()
  id: number;

  @Field()
  @Length(1, 50)
  name: string;
}

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
}
