import { Router } from "express";
import { getUser, getUsers } from "../controllers/User.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// get all the users data
userRouter.get("/", getUsers);
// get a specififc user data

userRouter.get("/:id", authorize, getUser);

//
userRouter.post("/", (req, res) => res.send({ title: "Create a new user" }));
userRouter.put("/:id", (req, res) =>
  res.send({ title: "update the user details" })
);
userRouter.get("/:id", (req, res) =>
  res.send({ title: "delete  the user details" })
);

export default userRouter;
