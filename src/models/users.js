import mongoose from "mongoose";

// Define the user schema for MongoDB
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
    about: String, // Optional about field
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, // Basic email pattern validation
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    picPath: {
      type: String,
      default: "", // Default profile picture path
    },
    location: {
      state: { type: String, require: true },
      city: { type: String, require: true },
      pincode: { type: Number, require: true },
    },
    impressions: { type: Number, default: 0 }, // Default impression count
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

// Export the user schema as a Mongoose model named "Users"
export default userSchema;
