const nodeMailer = require('../config/nodemailer');
const User = require('../models/user');

exports.newComment = (comment)=>{

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    
    nodeMailer.transporter.sendMail({
        from:"prashantsingh896@gmail.com",
        to: comment.user.email,
        subject: "New comment posted",
        html: htmlString
    }, (err, info)=>{
        if(err){
            console.log('Error in sending email for posted comment',err);
            return;
        }
        console.log('Message Sent', info);
    })


}