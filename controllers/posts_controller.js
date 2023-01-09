const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


module.exports.create = async (req, res) => {

    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        let user = await User.findById(req.user._id);

        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    post: post,
                    name: user.name
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