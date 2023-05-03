import authRepository from "../repositories/auth.repository";
import { string, ZodError } from "zod";

const codeSchema = string({ required_error: "Code is required" });

const getAuthUrl = async () => {
  try {
    const authUrl = await authRepository.authUrl();
    return authUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get auth URL");
  }
};

const oauth2callback = async (code: any) => {
  try {
    codeSchema.parse(code);
    const tokens = await authRepository.oauth2callback(code);
    return tokens;
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      throw error;
    }
    throw new Error("Unable to get tokens");
  }
};

export = {
  getAuthUrl,
  oauth2callback,
};
