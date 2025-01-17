import { transport } from './transporter.util';
import ejs from 'ejs';
import 'dotenv/config';

const { EMAIL_USER } = process.env;

interface MailOptions {
  receiver: string;
  subject: string;
  content: string;
}

interface MailResponse {
  success: boolean;
  message: string;
}

export const sendEmail = async ({
  receiver,
  subject,
  content
}: MailOptions): Promise<MailResponse> => {
  try {
    const data = await ejs.renderFile(`${__dirname}/../templates/welcome.ejs`, {
      receiver,
      content
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: receiver,
      subject: subject,
      html: data
    };

    const info = await transport.sendMail(mailOptions);

    return { success: true, message: info.response };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erreur lors de l'envoi de l'email :", err.message);
      return { success: false, message: err.message };
    } else {
      console.error('Une erreur inconnue est survenue :', err);
      return { success: false, message: 'Une erreur est survenue.' };
    }
  }
};
