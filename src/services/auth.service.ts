import authRepository from "../repositories/auth.repository";
import { string, ZodError } from "zod";
import BadRequestException from "../Exceptions/BadRequestException";

// Define a Zod schema for validating the 'code' parameter
const codeSchema = string({ required_error: "Code is required" });

/**
 * Get the Google OAuth2 authorization URL for the user to authenticate
 * their Google Calendar account.
 *
 * @returns {Promise<string>} A Promise that resolves to the authorization URL.
 * @throws {Error} If there is an error getting the authorization URL.
 */
const getAuthUrl = async () => {
  const authUrl = await authRepository.authUrl();
  if (!authUrl) {
    throw new BadRequestException("Unable to get authorization URL");
  }
  return authUrl;
};

/**
 * Exchange an authorization code for an access token and refresh token.
 *
 * @param {string} code - The authorization code to exchange for tokens.
 * @returns {Promise<Object>} A Promise that resolves to an object containing the access token and refresh token.
 * @throws {Error} If there is an error getting the tokens.
 * @throws {ZodError} If the 'code' parameter fails validation against the codeSchema.
 */
const oauth2callback = async (code: any) => {
  // Validate the 'code' parameter against the codeSchema
  codeSchema.parse(code);
  const tokens = await authRepository.oauth2callback(code);
  if (!tokens) {
    throw new BadRequestException("Unable to get tokens");
  }
  return tokens;
};

export = {
  getAuthUrl,
  oauth2callback,
};
