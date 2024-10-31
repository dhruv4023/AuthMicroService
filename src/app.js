import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "./config/cloudinary.config.js"
import config from './config/config.js';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import routes_v1 from './routes/index.routes.js';
import oauth_routes_v1 from './strategy/index.routes.js';
import { initializePassport } from "./strategy/passport.js";
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configure CORS policy
app.use(morgan("common")); // Log HTTP requests

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = JSON.parse(config.origin_url_list);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.database.db_url,
      dbName: config.database.db_name,
      collectionName: 'sessions'
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

initializePassport(passport)
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.status(200).json("Authentication Server is running...");
});

app.use('/', oauth_routes_v1);
app.use('/api/v1', routes_v1);


export default app
