import { Arg, Field, InputType, Query, Resolver, Mutation } from 'type-graphql';
import { Characteristic } from '../entity/characteristic.entities';

@InputType()
class CharacteristicInput {
  @Field()
  name: string;

  @Field()
  value: string;
}

@Resolver(Characteristic)
export default class CharacteristicResolver {
  @Query(() => [Characteristic])
  async getAllCharacteristic() {
    return await Characteristic.find();
  }

  @Mutation(() => Characteristic)
  async createNewCharacteristic(
    @Arg('characteristic') newCharacteristic: CharacteristicInput
  ) {
    const existingCharacteristic = await Characteristic.findOne({
      where: { value: newCharacteristic.value }
    });
    if (existingCharacteristic) {
      throw new Error(
        `This characteristic : "${newCharacteristic.value}" already exists`
      );
    }

    const characteristic = new Characteristic();
    characteristic.name = newCharacteristic.name;
    characteristic.value = newCharacteristic.value;

    await characteristic.save();
    return characteristic;
  }
}
