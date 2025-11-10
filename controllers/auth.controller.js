import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.Model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
// import { json } from "express";

//

export const signUp = async (req, res, next) => {
  const session = await mongoose?.startSession();

  session?.startTransaction();

  try {
    const { name, email, password } = req.body;

    const exisitingUser = await User.findOne({ email });

    // if user existsing then thorws a error
    if (exisitingUser) {
      const error = new Error("User already Exists");
      error.statusCode = 409;
      throw error;
    }

    // hash-password
    const salt = await bcrypt?.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // tokens
    const token = jwt?.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    //
    await session?.commitTransaction();
    session?.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers,
        // user: newUsers[0],
      },
    });
  } catch (err) {
    // if we got a erro rstop the session

    await session?.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if the user acytuall exisits
    const user = await User.findOne({ email });

    // not user then throw a error
    if (!user) {
      const error = new Error("User not Found");
      error.statusCode = 404;
      throw error;
    }

    // if a user does exisit then check the passwordd he entered
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // not correct password thjrow a error
    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }
    // if password is also right
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // if everything is right then  we let him to sign in
    res.status(200).json({
      success: true,
      message: "user signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
