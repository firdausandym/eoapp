import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './models/user.js';
import bcrypt from "bcrypt";

// localstrategy function + bcrypt
export const localStrategy = () => {
  passport.use('local', new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
     function(email, password, done) {
      User.findOne({ email: email }, async function (err, user) {

        if (err) {
          return done(err); 
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        if (user) {
          // check user password with hashed password stored in the database
          const validPassword = await bcrypt.compare(password, user.password);
          
          if (validPassword) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        }   
                  
      }
      );
    }
  ));
}

// serialize function
export const serialize = (req, res, next) => 
{
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
