const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.events",
];

// exports.getAuthUrl = () => {
//   return oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });
// };

// exports.getAccessToken = async (code: any) => {
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
//   return tokens;
// };

// exports.getCalendar = () => {
//   if (!oauth2Client.credentials) {
//     throw new Error("No access token found.");
//   }

//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//   return calendar;
// };

const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
};

const getAccessToken = async (code: any) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

const setTokens = async (tokens: any) => {
  oauth2Client.setCredentials(tokens);
};

const getCalendar = () => {
  if (!oauth2Client.credentials) {
    throw new Error("No access token found.");
  }

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  return calendar;
};

// module.exports = {
//   getAuthUrl,
//   getAccessToken,
//   getCalendar,
// };

export { getAuthUrl, getAccessToken, getCalendar, setTokens };
