dotEnv.config({ path: "./config.env" });
import app from "./app.js";
import dotEnv from "dotenv";

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const x = 23;
x = 25;
