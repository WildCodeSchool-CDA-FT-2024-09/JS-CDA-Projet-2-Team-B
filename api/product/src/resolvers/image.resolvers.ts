import { Image } from '../entity/image.entities';
import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';

@InputType()
class ImageInput {
  @Field()
  url: string;

  @Field()
  isMain: boolean;
}

@Resolver(Image)
export default class ImageResolver {
  @Query(() => [Image])
  async getAllImages(): Promise<Image[]> {
    return Image.find();
  }

  @Mutation(() => Image)
  async addImage(@Arg('data') newImage: ImageInput): Promise<Image> {
    console.info('newImage', newImage);

    const image = new Image();
    image.url = newImage.url;
    image.isMain = newImage.isMain;

    await image.save();
    return image;
  }
}
