const nodeMailer = require('../config/nodemailer');
const User = require('../models/user');

exports.newComment = (comment,email)=>{
    
    nodeMailer.transporter.sendMail({
        from:"prashantsingh896@gmail.com",
        to: email,
        subject: "New comment posted",
        html:'<h1>Yup, your comment is now published!</h1>'
    }, (err, info)=>{
        if(err){
            console.log('Error in sending email for posted comment',err);
            return;
        }
        console.log('Message Sent', info);
    })


}