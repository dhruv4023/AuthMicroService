import mongoose from "mongoose";
import config from "../config/config.js";

mongoose.set("strictQuery", true);

mongoose
    .connect(config.database.db_url, {
        dbName: config.database.db_name,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB database connected");
    })
    .catch((e) => {
        console.log("db not connected: ", e);
    });

import userSchema from "./users.model.js";


const db = {
    Users: mongoose.model("Users", userSchema),
}

export default db