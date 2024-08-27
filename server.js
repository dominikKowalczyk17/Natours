import mongoose from "mongoose";
dotEnv.config({ path: "./config.env" });
import app from "./app.js";
import dotEnv from "dotenv";

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
