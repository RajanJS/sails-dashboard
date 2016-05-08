/**
 * Created by rajan on 5/7/16.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(function(username,password,done){
  User.findOne({
    username: username
  }, function (err,user) {
    if(err){
      return done(err);
    }
    if(!user){
      return done(null,false,{message: 'Credentials not recognised!'}); //(err, user, info)
    }
    bcrypt.compare(password, user.password, function (err,res) {
      if(!res){
        return done(null,false,{message: 'Credentials not recognised!'});
      }
      return done(null,user,'Sign in Success!');
    });
    });
}));
