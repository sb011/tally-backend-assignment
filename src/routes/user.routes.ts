const userRouter = require("express").Router();
const passport = require("passport");

userRouter.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: any, res: { redirect: (arg0: string) => void }) => {
    // Redirect the user to the dashboard or home page
    res.redirect("/");
  }
);

export { userRouter };
