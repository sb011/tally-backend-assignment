import { Router } from "express";
import authController from "../controllers/auth.controller";

// Create a new instance of an Express router for the authentication routes.
const authRouter = Router();

/**
 * Route handler for the "/auth-url" endpoint. Returns the URL for Google's OAuth2 authentication flow.
 * @name GET/auth-url
 * @function
 * @memberof module:authRouter
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - The URL for Google's OAuth2 authentication flow.
 */
authRouter.get("/auth-url", (req: any, res: any) => {
  authController.getAuthUrl(req, res);
});

/**
 * Route handler for the "/oauth2callback" endpoint. Handles the callback from Google's OAuth2 authentication flow.
 * @name GET/oauth2callback
 * @function
 * @memberof module:authRouter
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
authRouter.get("/oauth2callback", (req: any, res: any) => {
  authController.oauth2callback(req, res);
});

export default authRouter;
