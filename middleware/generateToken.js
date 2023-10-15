import jwt from "jsonwebtoken";

// Function to generate a JWT token
const generateJWTToken = (user, secretKey) => {
  // Define the payload, including type ("typ") and expiration ("exp") claims
  const payload = {
    exp: Math.floor(Date.now() / 1000) + ( 60 * 60 ) * 2, // Expiration in 2 hour (adjust as needed)
    userId: user.username, // Subject claim with the user
  };
  
  // Generate the JWT token using the payload and the provided secret key
  const token = jwt.sign(payload, secretKey);

  // Return the generated token
  return token;
};

// Export the function for use in other parts of the application
export default generateJWTToken;
