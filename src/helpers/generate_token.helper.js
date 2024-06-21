import crypto from "crypto"
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Function to generate a JWT token
const generateJWTToken = ({ data, expMin = 300, shouldExpire }) => {
  // Define the payload
  const payload = {
    ...data, // Subject claim with the user
  };

  // Add the expiration claim if the token should expire
  if (shouldExpire)
    payload.exp = Math.floor(Date.now() / 1000) + 60 * expMin;

  // Generate the JWT token using the payload and the provided secret key
  const token = jwt.sign(payload, config.jwt_secret);

  // Return the generated token
  return token;
};

// Export the function for use in other parts of the application


export const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

export const generateHashWithOTPAndSecret = (otp) => {

  const hmac = crypto.createHmac('sha256', config.jwt_secret);

  hmac.update(otp);

  const hash = hmac.digest('hex');

  return hash;
};

export default generateJWTToken;
