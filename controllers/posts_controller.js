const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async (req, res) => {

    try {

        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        req.flash('success','Post published successfully');

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