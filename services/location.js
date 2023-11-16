import pool from "../config/database.js"
// Function to add location data if it is unique
export const addUniqueLocation = ({ city, state, pincode }) => {
  return new Promise((resolve, reject) => {
    // Check if the location already exists
    const selectLocationQuery = `
        SELECT location_id
        FROM location
        WHERE city = ? AND state = ? AND pincode = ?
      `;

    const locationValues = [city, state, pincode];

    pool.query(
      selectLocationQuery,
      locationValues,
      (error, results, fields) => {
        if (error) {
          console.error("Error checking location existence: " + error.message);
          reject(error);
          return;
        }

        if (results.length > 0) {
          // Location already exists, return the existing location_id
          resolve(results[0].location_id);
        } else {
          // Location does not exist, insert it
          const insertLocationQuery = `
            INSERT INTO location (city, state, pincode)
            VALUES (?, ?, ?)
          `;

          pool.query(
            insertLocationQuery,
            locationValues,
            (error, locationResults, fields) => {
              if (error) {
                console.error("Error inserting location: " + error.message);
                reject(error);
                return;
              }

              // Return the newly inserted location_id
              resolve(locationResults.insertId);
            }
          );
        }
      }
    );
  });
};
