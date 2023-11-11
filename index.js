import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configure CORS policy
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON requests with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded requests with size limit
app.use(cors({ origin: JSON.parse(process.env.ORIGIN_URL_List) })); // Configure CORS for allowed origins
app.use("/", express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

// Root route that returns a simple "Server is running..." message
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Define routes for authentication, user, and mail functionality
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import mailRoute from "./routes/mail.js";

app.use("/auth", authRoute); // Use the authentication route
app.use("/user", userRoute); // Use the user route
app.use("/mail", mailRoute); // Use the mail route

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT:", process.env.PORT);
});

/* ---------------------------- SQL SERVER CONNECTION ------------------- */
import mysql from "mysql";
// SQL Server configuration
var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("mysql Connected!");
});

/* ---------------------------- Cloudinary configuration ------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
