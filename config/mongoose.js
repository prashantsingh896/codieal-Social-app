const mongoose = require('mongoose');
const env = require('./environment');

let domain;
if(process.env.NODE_ENV=="production"){
    domain = "127.0.0.1"
}
else{
    domain="localhost"
}
mongoose.connect(`mongodb://${domain}/${env.db}`);

const db = mongoose.connection;

db.on('Error',console.error.bind(`Error in connecting to db ${Error}`));

db.once('open',()=>{
    console.log('Successfully connected to database:: MongoDB ',domain);
});

module.exports = db;