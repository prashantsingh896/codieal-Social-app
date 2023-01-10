const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


//method to return posts in JSON
module.exports.index = async function(req,res){

    let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

    return res.json(200,{
        message:"Lists of post",
        posts:posts
    })
}

//method to delete a post
module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message:"Post and associated comments deleted"
            })
        
    }
    catch (err) {
        return res.json(500,{
            message:"Internal server error"
        })
    }

}