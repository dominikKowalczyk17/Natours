import tourRouter from "./routes/toursRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express, { json, static as static_ } from "express";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(json());
app.use(static_(`${__dirname}/public`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
