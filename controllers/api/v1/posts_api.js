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
        
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message:"Post and associated comments deleted"
            })
        
    }else{
        return res.json(401,{
            message: "You can not delete the post"
        })
    }
}
    catch (err) {
        return res.json(500,{
            message:"Internal server error"
        })
    }

}