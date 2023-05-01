const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// configure Passport to serialize/deserialize user
passport.serializeUser(function (
  user: any,
  done: (arg0: null, arg1: any) => void
) {
  done(null, user);
});

passport.deserializeUser(function (
  user: any,
  done: (arg0: null, arg1: any) => void
) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);
