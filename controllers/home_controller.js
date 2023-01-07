const Post = require('../models/post');

module.exports.home = function(req,res){

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.error.bind(`Error in loading posts from DB ${err}`);
    //     }
    //     else{
    //         return res.render('home', {
    //             title: "codeial | Home",
    //             posts: posts
    //         });
    //     }
    // });

    //populate the user of all posts
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    });
};