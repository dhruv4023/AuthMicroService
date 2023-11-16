// import mysql from "mysql";

// // Create a MySQL pool
// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Define the SQL query to create the MySQL table
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(50) NOT NULL,
//     last_name VARCHAR(50) NOT NULL,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   )

// // Function to create the MySQL table
// async function createTable() {
//   const connection = pool.getConnection();
//   await connection.query(createTableQuery);
//   connection.release();
// }

// export default createTable;
