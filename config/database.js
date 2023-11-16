// Load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config();

import { createPool } from "mysql";

const pool = createPool({
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

export default pool;
