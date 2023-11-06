import asyncHandler from "express-async-handler";
import { sendEmail } from "../services/emailServices";

const sendTestEmail = asyncHandler(async (req, res, next) => {
  try {
    const response = await sendEmail();

    res
      .status(200)
      .send("Email sent successfully! " + JSON.stringify(response));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error scraping project: " + error);
  }
});

const emailController = {
  sendTestEmail,
};

export default emailController;
