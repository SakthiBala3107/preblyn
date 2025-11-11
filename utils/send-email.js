import dayjs from "dayjs";
import { emailTemplates } from "./email.template.js";
import transport, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  //   guard clause
  if (!to || !type) throw new Error("Missing required parameters");

  // we are checking whether the email templates label and the type(dayls, 7, 5, 2, 1, ) are the same
  const template = emailTemplates.find((t) => t?.label == type);

  //   guardclause
  if (!template) throw new Error("Invalid email type");

  const mailInfo = {
    userName: subscription?.user?.userName,
    subscriptionName: subscription?.name,
    renewalDate: dayjs(subscription?.renewalDate).format("MMM D YYYY"),
    planName: subscription?.name,
    price: `${subscription?.currency} ${subscription?.price}  (${subscription?.frequency})`,
    paymentMethod: subscription?.paymentMethod,
  };

  const message = template?.generateBody(mailInfo);
  const subject = template?.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  //
  transport.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error, "Error sending email");
    console.log("EMAIL SENT :" + info.response);
  });
};
