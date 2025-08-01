import nodemailer from "nodemailer";
import config from "@/config";
import { EmailTemplate } from "@/models";
import isEmpty from "is-empty";
import moment from "moment";


const transporter = nodemailer.createTransport({
      host: config.NODEMAILER.HOST,
      port: config.NODEMAILER.PORT,
      secure: config.NODEMAILER.SECURE,
      auth: {
        user: config.NODEMAILER.USER_NAME,
        pass: config.NODEMAILER.PASSWORD,
      }})


export const sendMail = async ({  userEmail, otp }) => {
  try {
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Your OTP Code",
    html: `<p>Your OTP is: <b>${otp}</b>. It is valid for 10 minutes.</p>`
  };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (err) {
    console.error(" Failed to send email:", err);
    return false;
  }
};