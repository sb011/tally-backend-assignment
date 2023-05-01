const { Routes } = require("express");
import { UserController } from "../controllers/user.controller";

const userRouter = Routes();

const userController = new UserController();

userRouter.get("/auth/google", userController.googleAuth);
userRouter.get("/auth/google/callback", userController.googleAuthCallback);

export { userRouter };
