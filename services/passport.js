const passportServices = (keys, User, GoogleStrategy, passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            return done(null, existingUser);
          }

          const user = await new User({
            googleId: profile.id,
            name: profile.name.givenName,
            profilePic: profile.photos[0].value,
          }).save();

          done(null, user);
        } catch (error) {
          console.error(error);
        }
      }
    )
  );
};

module.exports = passportServices;
