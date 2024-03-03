import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15,
      unique: true,
      trim: true,
      lowercase: true // Convert to lowercase
    },
    about: {
      type: String,
      maxlength: 100 // Set maximum length
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20
    },
    picPath: {
      type: String,
      default: "",
      trim: true
    },
    location: {
      state: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      pincode: {
        type: Number,
        required: true
      }
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    verified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  { timestamps: true }
);

export default userSchema;
