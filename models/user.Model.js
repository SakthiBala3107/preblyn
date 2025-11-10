import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // name
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    //   email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Please fill a valid email address",
      ],
      minLength: 5,
      maxLength: 255,
    },
    //   password
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minLength: 8,
      maxLength: 150,
    },
  },
  { timestamps: true }
);

// create and export the model

const User = mongoose.model("User", userSchema);

export default User;
