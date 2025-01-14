import nodemailer, { Transporter } from 'nodemailer';
import 'dotenv/config';

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

export const transport: Transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});
