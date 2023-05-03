const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

// Create OAuth2 client instance with Google credentials
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Define scopes required for calendar API access
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.events",
];

// Generate Google OAuth2 authorization URL
const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
};

// Exchange authorization code for access token
const getAccessToken = async (code: any) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

// Set the access token for OAuth2 client
const setTokens = async (tokens: any) => {
  oauth2Client.setCredentials(tokens);
};

// Get the calendar API instance with authentication
const getCalendar = () => {
  if (!oauth2Client.credentials) {
    throw new Error("No access token found.");
  }

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  return calendar;
};

export { getAuthUrl, getAccessToken, getCalendar, setTokens };
