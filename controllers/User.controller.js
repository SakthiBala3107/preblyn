import User from "../models/user.Model.js";

// get all th user data
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// get  a user data
export const getUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-passsword");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
