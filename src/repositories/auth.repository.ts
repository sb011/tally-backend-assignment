import { getAuthUrl, getAccessToken } from "../utils/calendarConfig";

/**
 * Returns the URL for Google's OAuth2 authentication flow.
 *
 * @returns {string} - The URL for Google's OAuth2 authentication flow.
 * @throws {Error} - If there is an error getting the auth URL.
 */
const authUrl = async () => {
  try {
    const authUrl = await getAuthUrl();
    return authUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get auth URL");
  }
};

/**
 * Handles the callback from Google's OAuth2 authentication flow.
 *
 * @param {string} code - The authorization code returned from Google's OAuth2 authentication flow.
 * @returns {Object} - An object containing the access token and refresh token.
 * @throws {Error} - If there is an error getting the access token.
 */
const oauth2callback = async (code: any) => {
  try {
    const tokens = await getAccessToken(code);
    return tokens;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get tokens");
  }
};

export = {
  authUrl,
  oauth2callback,
};
