module.exports.profile = function(req,res){
    res.render('./user_profile.ejs',{
        title: "Profile Page"
    });
}