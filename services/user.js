import bcrypt from "bcrypt";
import pool from "../config/database.js";
export const getUserData = async ({ id, delPassword = true }) => {
  const query = mongoose.isValidObjectId(id)
    ? { _id: id }
    : {
        $or: [{ email: id }, { username: id }],
      };
  // console.log(query)
  const user = await Users.findOne(query);
  if (user) {
    // Remove "password" and "_id" fields
    user._id = undefined;
    delPassword && (user.password = undefined);
    return user;
  } else {
    console.log("User not found.");
    return null;
  }
};

export const addNewUserData = async (userData) => {
  try {
    console.log(userData);
    const locationId = await addUniqueLocation({
      state: userData["location.state"],
      city: userData["location.city"],
      pincode: userData["location.pincode"],
    });
    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const values = [
      firstName,
      lastName,
      username,
      email,
      about,
      filePath || null,
      passwordHash,
      locationId,
    ];
    // Insert the new user into the 'users' table
    const insertQuery = `
        INSERT INTO users
          (firstName, lastName, username, email, about, picPath, password, locationId)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?)
      `;

    pool.query(insertQuery, values, (error, results, fields) => {
      if (error) {
        console.error("Error inserting new user: " + error.message);
        return null;
      }
      return results.insertId;
    });
  } catch (error) {
    return null;
  }
};
