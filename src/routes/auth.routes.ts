import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/auth-url", (req: any, res: any) => {
  authController.getAuthUrl(req, res);
});

authRouter.get("/oauth2callback", (req: any, res: any) => {
  authController.oauth2callback(req, res);
});

// module.exports = authRouter;
export default authRouter;
