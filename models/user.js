// import mongoose 
import mongoose from "mongoose";

// import bcrypt
import bcrypt from "bcrypt";

// create user schema
const User = new mongoose.Schema({

    name: String,
    username: String,
    email: String,
    password: String,
    organizations: [{
        organization : String,
        Invited: {type: Date, default: Date.now}
    }],
    projects: [{
      project: String,
      Invited: {type: Date, default: Date.now}
    }],

}, { timestamps: { createdAt: 'created', updatedAt : 'updated' }});

// bcrypt
User.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

// export user model
export default mongoose.model('User', User);