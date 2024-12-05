import { Arg, Field, InputType, Query, Resolver, Mutation } from 'type-graphql';
import { Characteristic } from '../entity/characteristic.entities';
import { IsNumber } from 'class-validator';

@InputType()
class CharacteristicInput {
  @Field({ nullable: true })
  @IsNumber()
  id?: number;

  @Field()
  name: string;
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
    try {
      const existingCharacteristic = await Characteristic.findOne({
        where: { name: newCharacteristic.name }
      });
      if (existingCharacteristic) {
        throw new Error(
          `This characteristic : "${newCharacteristic.name}" already exists`
        );
      }

      const characteristic = new Characteristic();
      characteristic.name = newCharacteristic.name;

      await characteristic.save();
      return characteristic;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création de la caractéristique ${error.message} `
      );
    }
  }

  @Mutation(() => Characteristic)
  async editCharacteristic(
    @Arg('characteristic') newCharacteristic: CharacteristicInput
  ) {
    try {
      const characteristicEdit = await Characteristic.findOneBy({
        id: newCharacteristic.id
      });

      if (!characteristicEdit) {
        throw new Error(`Characteristic not found`);
      }
      const existingCharacteristic = await Characteristic.findOneBy({
        name: newCharacteristic.name
      });

      if (existingCharacteristic) {
        throw new Error('Une caracteristique existe deja avec ce nom');
      }
      characteristicEdit.name = newCharacteristic.name;
      await characteristicEdit.save();

      return characteristicEdit;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
