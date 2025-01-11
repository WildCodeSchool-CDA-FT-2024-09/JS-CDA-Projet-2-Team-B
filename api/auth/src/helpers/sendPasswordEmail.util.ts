import axios from 'axios';

interface Response {
  success: boolean;
}

export const sendPasswordEmail = async (
  email: string,
  password: string
): Promise<Response> => {
  try {
    const response = await axios.post(
      'http://email:8000/email/send',
      {
        receiver: email,
        subject: 'Pimp My Product - Bienvenue !',
        content: `Un compte a été créé pour vous sur la plateforme Pimp My Product. Votre mot de passe est : ${password}`
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    if (response.status === 200) {
      return { success: true };
    }

    console.error("Échec de l'envoi de l'email : ", response.data);
    return { success: false };
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de l'envoi de l'email : ",
      error
    );
    return { success: false };
  }
};
