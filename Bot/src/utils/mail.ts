import Nodemailer from 'nodemailer';
import Config from "../config";

const SendVerificationMail = async (to: string, code: string) => {
    const transporter = Nodemailer.createTransport({
        host: Config.MAIL_HOST,
        port: Config.MAIL_PORT,
        secure: false,
        tls: {
            rejectUnauthorized: false,
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: to,
        subject: 'Kod weryfikacyjny',
        text: `Twój kod weryfikacyjny WIG to: ${code}`
    };

    await transporter.sendMail(mailOptions);
}

export default SendVerificationMail;