// const { getAccessToken } = require("../utils/calendarConfig");
import { setTokens } from "../utils/calendarConfig";

const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new Error("Authorization header is missing");
    }
    // console.log(JSON.parse(authToken));
    // const accessToken = authHeader.split(" ")[1];
    // if (!accessToken) {
    //   throw new Error("Access token is missing");
    // }
    await setTokens(JSON.parse(authToken));
    // console.log(tokens);
    // const { tokens } = await oauth2Client.getTokenInfo(accessToken);
    // if (!tokens || !tokens.access_token) {
    //   throw new Error("Invalid access token");
    // }
    // oauth2Client.setCredentials(tokens);
    next();
  } catch (error) {
    // console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyToken;
