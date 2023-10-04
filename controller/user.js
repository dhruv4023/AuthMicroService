import mongoose from "mongoose";
import Users from "../models/Users.js";
// import Services from "../models/Services.js";
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;
    if (mongoose.isValidObjectId(UID)) {
      const user = await Users.find({ _id: UID });
      // console.log(user);
      res.status(200).json(user);
    } else {
      const user = await Users.findOne({ username: UID });
      // console.log(user);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json(null);
  }
};
