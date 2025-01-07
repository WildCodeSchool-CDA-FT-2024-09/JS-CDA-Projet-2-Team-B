import { Image } from '../entity/image.entities';
import { Resolver, Query } from 'type-graphql';

@Resolver(Image)
export default class ImageResolver {
  @Query(() => [Image])
  async getAllImages(): Promise<Image[]> {
    return Image.find();
  }
}
