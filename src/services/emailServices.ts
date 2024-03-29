import nodemailer from "nodemailer";

export async function sendEmail() {
  const username = String(process.env.MAILTRAP_USERNAME);
  const password = String(process.env.MAILTRAP_PASSWORD);

  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: username,
      pass: password,
    },
  });

  const recipients = ["catalin.bora@gmail.com"];

  const info = await transporter.sendMail({
    from: '"Open360" <no-reply@open360.wiki>', // sender address
    to: recipients, // list of receivers
    subject: "Welcome to Open360", // Subject line
    text: "\n \n \tWe are so happy you joined us! \n \n Nice day, \n \t The Open360 Team", // plain text body
    html: `<div>
            <b>Welcome,</b>
            <br/>
            <br/>
            <p>We are so happy you joined us!</p>
            <br/>
            <p>Nice day,</p>
            <br/>
            <div>
              <img src="https://www.open360.wiki/assets/logo.svg" alt="Open360 Logo" width="36" height="36"/>
              <p style="font-weight: 700; color:black;" >Open <span style="color:rgb(29 101 149);">360</span>
              </p>
            </div>
          </div>`,
  });

  return info;
}
