const authRouter = require("express").Router();
const authController = require("../controllers/auth.controller");

authRouter.get("/auth-url", (req: any, res: any) => {
  authController.getAuthUrl(req, res);
});

authRouter.get("/oauth2callback", (req: any, res: any) => {
  authController.oauth2callback(req, res);
});

module.exports = authRouter;
