const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const Like = require('../models/like');

module.exports.create = async (req, res) => {

    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });


        if(req.xhr){
            let user = await User.findById(req.user._id);

            post = await post.populate('user','name');
            
            return res.status(200).json({
                data:{
                    post: post,
                },
                message: "Post Created!"
            })
        }

        

        return res.redirect('back');

    }

    catch (err) {
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {

    try {

        let post = await Post.findById(req.params.id);
        //.id means converting the obj id into string
        if (post.user == req.user.id) {

            //delete the associates likes for the post and all its comments' likes too
            await Like.deleteMany({likeable:post, onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});

            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:"Post deleted"
                });
            }

            req.flash('success','Post deleted successfully');
            return res.redirect('back');
        }
        else {
            req.flash("You can't delete the post");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }

}