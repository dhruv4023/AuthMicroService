import jwt from "jsonwebtoken";

// Function to generate a JWT token
const generateJWTToken = ({ data, secretKey, expMin = 120 }) => {
  // Define the payload, including type ("typ") and expiration ("exp") claims
  const payload = {
    exp: Math.floor(Date.now() / 1000) + 60 * expMin, // Expiration in 2 hour (adjust as needed)
    ...data, // Subject claim with the user
  };

  // Generate the JWT token using the payload and the provided secret key
  const token = jwt.sign(payload, secretKey);

  // Return the generated token
  return token;
};

// Export the function for use in other parts of the application
export default generateJWTToken;
