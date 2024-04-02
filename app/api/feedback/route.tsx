// import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export const POST = async (req) => {
  if (req.method === 'POST') {    
    const { name, email, message } = await req.json();

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.NEXT_PERSONAL_EMAIL,
        pass: process.env.NEXT_EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.NEXT_PERSONAL_EMAIL,
      to: process.env.NEXT_PERSONAL_EMAIL,
      subject: 'Feedback from your website',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      return new Response("Feedback sent successfully", {status:200});
    } catch (error) {
      console.error('Error:', error);
      return new Response("Failed to send feedback", { status: 500 });
    }
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}