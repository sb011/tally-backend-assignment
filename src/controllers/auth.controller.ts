import authService from "../services/auth.service";
import { ZodError } from "zod";

const getAuthUrl = async (req: any, res: any) => {
  try {
    const authUrl = await authService.getAuthUrl();
    res.status(200).json(authUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const oauth2callback = async (req: any, res: any) => {
  try {
    const code = req.query.code as string;
    const tokens = await authService.oauth2callback(code);
    res.status(200).json(tokens);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export = {
  getAuthUrl,
  oauth2callback,
};
