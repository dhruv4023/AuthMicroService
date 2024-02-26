import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      unique: true,
    },
    about: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    picPath: {
      type: String,
      default: "",
    },
    location: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    verificationToken: {
      token: {
        type: String,
      },
      expires: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export default userSchema