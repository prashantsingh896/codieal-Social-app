const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

//tell passport to use new google auth strategy
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: "http://codeial-social-app.online/auth/google/callback"
 }, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in google strategy passport',err);return;};
        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('Error in creating user',err);return;};
                return done(null,user);
            })
        }


    })
 }

 ));

 module.exports = passport;