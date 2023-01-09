const User = require('../models/user');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: 'User Profile',
            profile_user: user
        });
    });
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    // });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('***Multer Error',err); return;}

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    //this is saving the path of the uploaded file into avatar field in user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }
        catch(e){
            req.flash('error');
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

};

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
        return res.redirect('/users/profile');
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout(function(err){
        req.flash('success','You have Logged out');
        return res.redirect('/');
    });
}