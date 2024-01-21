import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import config from './config/config.js';

const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configure CORS policy
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON requests with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded requests with size limit
app.use(cors({ origin: JSON.parse(config.origin_url_list)})); // Configure CORS for allowed origins
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// importing routes
import routes_v1 from './routes/index.routes.js';

// defining routes
app.use('/api/v1/', routes_v1);


export default app