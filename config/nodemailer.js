import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sakthibala31072004@gmail.com",
    pass: EMAIL_PASSWORD,
  },
});
export default transport;
