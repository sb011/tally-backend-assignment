import { getAuthUrl, getAccessToken } from "../utils/calendarConfig";

const authUrl = async () => {
  try {
    const authUrl = await getAuthUrl();
    return authUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get auth URL");
  }
};

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
