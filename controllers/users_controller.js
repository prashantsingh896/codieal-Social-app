const User = require('../models/user');

module.exports.profile = function (req, res) {
    res.render('./user_profile.ejs', {
        title: "Profile Page"
    });
}

//render the sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    else {
        return res.render('user_sign_up', {
            title: "User SignUp"
        })
    }
};


//render the sign In page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }
    else {

        return res.render('user_sign_in', {
            title: "User SignIn"
        })

    }

};

//get the sign up data
module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        console.log('passwd not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in signing up user');
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in signing up user');
                    return;
                }

                return res.redirect('/users/sign-in');



            })
        }
        else {
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}