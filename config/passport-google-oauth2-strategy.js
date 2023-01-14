const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new google auth strategy
passport.use(new googleStrategy({
    clientID:'817690390084-d7a91g0srjqt8ovqjkvu3h08pq3p9pks.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
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