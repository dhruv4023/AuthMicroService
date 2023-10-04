import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    username: {
      type: String,
      require: true,
      min: 2,
      max: 50,
      unique: true,
    },
    about: { type: String },
    email: {
      type: String,
      require: true,
      min: 2,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
      max: 32,
    },
    picPath: {
      type: String,
      default: "",
    },
    location: {
      state: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    impressions: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model("Users", userSchema);
