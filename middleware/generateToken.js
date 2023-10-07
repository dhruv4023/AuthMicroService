import jwt from "jsonwebtoken";

const generateJWTToken = (user,secretKey) => {
  // Define the payload, including type ("typ") and expiration ("exp") claims
  const payload = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiration in 15 minutes (adjust as needed)
    userId: user._id, // Subject claim with the user's ID
   };
  // Generate the JWT token
  const token = jwt.sign(payload, secretKey);
  return token;
};

export default generateJWTToken