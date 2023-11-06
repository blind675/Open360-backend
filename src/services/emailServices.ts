import nodemailer from "nodemailer";

export async function sendEmail() {
  const username = String(process.env.MAILTRAP_USERNAME);
  const password = String(process.env.MAILTRAP_PASSWORD);

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: username,
      pass: password,
    },
  });

  const recipients = ["catalin.bora@gmail.com"];

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: recipients, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  return info;
}
