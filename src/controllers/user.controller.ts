const { Request, Response } = require("express");
const { UserService } = require("../services/user.service");

const oauthService = new UserService();

const initiateGoogleOAuth = async (req: Request, res: Response) => {
  const authorizationUrl = oauthService.getGoogleAuthorizationUrl();
  return res.redirect(authorizationUrl);
};

const handleGoogleOAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  const tokens = await oauthService.getGoogleAccessToken(code);
  return res.status(200).json(tokens);
};

const getCurrentUser = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const user = await oauthService.getCurrentUser(accessToken);
  return res.status(200).json(user);
};

export const UserController = {
  initiateGoogleOAuth,
  handleGoogleOAuthCallback,
  getCurrentUser,
};
