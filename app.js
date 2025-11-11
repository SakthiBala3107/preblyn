import express, { urlencoded } from "express";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectToDataBase } from "./Database/mongodb.js";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import errorMiddlerWare from "./middlewares/error.middleware.js";
import arcjetMiddleWare from "./middlewares/archjet.middleware.js";
import workFlowRouter from "./routes/workflow.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
// arcjet
app.use(arcjetMiddleWare);

// route-middlewares
const INSTANCE = "/api/v1";
//
app.use(`${INSTANCE}/auth`, authRouter);
app.use(`${INSTANCE}/users`, userRouter);
app.use(`${INSTANCE}/subscriptions`, subscriptionRouter);
app.use(`${INSTANCE}/workflow`, workFlowRouter);

// error-middleWares
app.use(errorMiddlerWare);

//
// routes home
app.get("/", (req, res) => {
  res.send(
    "YO again , this timea backend project to wrap up everything right!, i got you "
  );
});

console.log(process.env?.NODE_ENV || " NOT GOT ACCES TO NODE_ENV YET");
//
//
//
// SERVER
app.listen(PORT, async () => {
  console.log(`Server is listening to port  http://localhost:${PORT}`);

  // establishing connecvtion between server to DB
  await connectToDataBase();
});

export default app;
