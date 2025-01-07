import { Characteristic } from '../entity/characteristic.entities';
import { Arg, Query, Resolver, Mutation, Int } from 'type-graphql';
import { CharacteristicInput } from '../types/characteristic.types';

@Resolver(Characteristic)
export default class CharacteristicResolver {
  @Query(() => [Characteristic])
  async getAllCharacteristic(
    @Arg('isDeleted', () => Boolean, { nullable: true })
    isDeleted = false
  ): Promise<Characteristic[]> {
    try {
      return await Characteristic.find({ withDeleted: isDeleted });
    } catch (error) {
      throw new Error(
        ` Erreur lors de la récupération des characteristiques : ${error.message}`
      );
    }
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

  @Mutation(() => Boolean)
  async disableCharacteristic(
    @Arg('id', () => Int) id: number
  ): Promise<boolean> {
    try {
      const characteristic = await Characteristic.findOne({
        where: { id }
      });
      if (!characteristic) {
        throw new Error('Characteristic not found');
      }
      await characteristic.softRemove();
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async enableCharacteristic(
    @Arg('id', () => Int) id: number
  ): Promise<boolean> {
    try {
      const characteristic = await Characteristic.findOne({
        where: { id },
        withDeleted: true
      });
      if (!characteristic) {
        throw new Error('Characteristic not found');
      }
      await characteristic.recover();
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
