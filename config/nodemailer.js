const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter =  nodemailer.createTransport({
    service:'gmail',
    host:'smtp',
    port:'587',
    secure: false,
    auth:{
        user:'prashantsingh896@gmail.com',
        pass:'wtrfconyzlzzhilm'
    }

});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data, function(err,template){
            if(err){
                console.log('Error in rendering mail',err);
            }

            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    renderTemplate: renderTemplate,
    transporter: transporter
}