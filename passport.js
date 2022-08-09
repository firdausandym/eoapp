import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './models/user.js';
import bcrypt from "bcrypt";

// localstrategy function + bcrypt
export const localStrategy = () => {
  console.log('try login')
  passport.use('local', new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
     function(email, password, done) {
      console.log(email, 'ini data email dari passport.js')
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
          console.log(validPassword);
          
          if (validPassword) {
            console.log('validPassword dari bcrypt passport.js');
            console.log(password, 'ini password dari passport.js');
            return done(null, user);
          } else {
            console.log('password tidak sama dari bcrypt');
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
console.log('menjalankan serialize');
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
