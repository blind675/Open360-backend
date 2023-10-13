import express from "express";
import "dotenv/config";
import router from "./routes/router";
import { connectToDatabase } from "./db/mongoose";

function init() {
  const app = express();
  const port = process.env.PORT;

  app.use(express.json());
  app.use("/api/v1", router);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });

  connectToDatabase();
}

init();
