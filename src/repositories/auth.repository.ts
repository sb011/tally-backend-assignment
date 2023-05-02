// const { getAuthUrl, getAccessToken } = require("../utils/calendarConfig");
import { getAuthUrl, getAccessToken } from "../utils/calendarConfig";

exports.getAuthUrl = async () => {
  try {
    const authUrl = await getAuthUrl();
    return authUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get auth URL");
  }
};

exports.oauth2callback = async (code: any) => {
  try {
    const tokens = await getAccessToken(code);
    return tokens;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get tokens");
  }
};
