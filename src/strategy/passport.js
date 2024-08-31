import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import config from '../config/config.js';

dotenv.config();

export function initializePassport(passport) {
  passport.use(new GoogleStrategy({
    clientID: config.google.client_id,
    clientSecret: config.google.client_secret,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
    (req, accessToken, refreshToken, profile, done) => {
      // Extract email and name from the profile
      const { email, given_name, family_name } = profile._json;

      // const state = req.query.state;
      // Create a user object with email and name
      const user = {
        email,
        firstName: given_name,
        lastName: family_name // assuming state contains baseurl
      };

      // Handle the user profile and store user information as needed
      return done(null, user);
    }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
