// const { getAccessToken } = require("../utils/calendarConfig");
import { setTokens } from "../utils/calendarConfig";

const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new Error("Authorization header is missing");
    }

    await setTokens(JSON.parse(authToken));

    next();
  } catch (error) {
    // console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default verifyToken;
