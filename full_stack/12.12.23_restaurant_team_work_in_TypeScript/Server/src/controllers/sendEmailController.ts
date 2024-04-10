import express, { Request, Response } from 'express';
const nodemailer = require('nodemailer');
require('dotenv').config();


const router = express.Router();
const user = process.env.EMAIL_USER
const password = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  host: 'outlook.office365.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: user,
    pass: password,
  },
  logger: true,
});

interface EmailRequest {
  to: string;
  subject: string;
  body: string;
}



router.post('/', async (req: Request<EmailRequest>, res: Response) => {
  const { to, subject, body } = req.body;
  const mailOptions = {
    from: user,
    to: to,
    subject: subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error:any) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export = router;
