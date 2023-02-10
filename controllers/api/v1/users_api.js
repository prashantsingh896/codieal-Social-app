const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('./../../../config/environment');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password!=req.body.password){
            return res.status(422).json({
                message:"Invalid username or password"
            });
        }

        else{

            return res.status(200).json({
                message:"Sign in successful and JWT generated",
                data:{
                    token: jwt.sign(user.toJSON(),env.jwt_secret, {expiresIn:100000})
                }
            })
        }
    }
    catch(e){
        console.log('****', err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}