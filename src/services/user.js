import db from "../models/index.js"
import mongoose from "mongoose";

const { Users } = db;
export const getUserData = async ({ id, delPassword = true }) => {
  const query = mongoose.isValidObjectId(id)
    ? { _id: id }
    : {
      $or: [{ email: id }, { username: id }],
    };
  // console.log(query)
  const user = await Users.findOne(query);
  if (user) {
    // Remove "password" and "_id" fields
    user._id = undefined;
    delPassword && (user.password = undefined);
    return user;
  } else {
    console.log("User not found.");
    return null;
  }
};
