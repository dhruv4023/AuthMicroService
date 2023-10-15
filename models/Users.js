import mongoose from "mongoose";

// Define the user schema for MongoDB
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
      unique: true, // Ensure usernames are unique
    },
    about: { type: String },
    email: {
      type: String,
      require: true,
      min: 2,
      unique: true, // Ensure email addresses are unique
    },
    password: {
      type: String,
      require: true,
      min: 5,
      max: 32,
    },
    picPath: {
      type: String,
      default: "", // Default profile picture path
    },
    location: {
      state: { type: String, require: true },
      city: { type: String, require: true },
      pincode: { type: String, require: true },
    },
    impressions: { type: Number, default: 0 }, // Default impression count
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

// Export the user schema as a Mongoose model named "Users"
export default mongoose.model("Users", userSchema);
