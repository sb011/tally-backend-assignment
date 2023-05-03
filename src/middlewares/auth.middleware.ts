import { setTokens } from "../utils/calendarConfig";

// Middleware function to verify the access token
const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new Error("Authorization header is missing");
    }

    // Set the access token in the OAuth2 client
    await setTokens(JSON.parse(authToken));
    // Call the next middleware function
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default verifyToken;
