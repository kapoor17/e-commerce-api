import { Express } from 'express';
import passport from 'passport';
import LocalStrategy, {
  VerifyFunction,
  IStrategyOptions
} from 'passport-local';
import Customer from '../models/Customer';
import Auth from '../services/Auth';

const passportLoader = (app: Express) => {
  const customFields: IStrategyOptions = {
    usernameField: 'email'
  };

  const verifyCallback: VerifyFunction = async (email, password, done) => {
    try {
      let user = await Customer.findOneByEmail(email);
      if (!user) return done(null, false);
      if (!(await Auth.comparePassword(user.password, password)))
        return done(null, false);
      return done(null, user);
    } catch (e) {
      console.error(`Error while authenticating the User: ${e}`);
      return done(e);
    }
  };

  const localStrategy = new LocalStrategy.Strategy(
    customFields,
    verifyCallback
  );

  passport.use(localStrategy);

  passport.serializeUser(async (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId: string, done) => {
    Customer.findOneById(userId)
      .then((user) => done(null, user))
      .catch((e) => done(e));
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportLoader;
