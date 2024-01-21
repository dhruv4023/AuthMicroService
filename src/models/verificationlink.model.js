import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            unique: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now,
            expires: 600, // 10 minutes TTL, adjust as needed (value is in seconds)
        },
    },
    { timestamps: true }
);

export default verificationSchema;
