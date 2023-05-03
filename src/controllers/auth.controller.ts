import authService from "../services/auth.service";
import { ZodError } from "zod";

/**
 * Route handler for the "/auth-url" endpoint. Returns the URL for Google's OAuth2 authentication flow.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - The URL for Google's OAuth2 authentication flow.
 * @throws {Error} - If there is an error getting the auth URL.
 */
const getAuthUrl = async (req: any, res: any) => {
  try {
    const authUrl = await authService.getAuthUrl();
    res.status(200).json(authUrl);
  } catch (error: any) {
    console.error(error);
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * Route handler for the "/oauth2callback" endpoint. Handles the callback from Google's OAuth2 authentication flow.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - An object containing the access token and refresh token.
 * @throws {Error} - If there is an error getting the access token.
 */

const oauth2callback = async (req: any, res: any) => {
  try {
    const code = req.query.code as string;
    const tokens = await authService.oauth2callback(code);
    res.status(200).json(tokens);
  } catch (error: any) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    } else if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export = {
  getAuthUrl,
  oauth2callback,
};
