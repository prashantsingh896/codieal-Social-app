const mongoose = require('mongoose');
const env = require('./environment');

let uri;
if(process.env.NODE_ENV=="production"){
    uri = process.env.MONGO_URI
}
else{
    uri=`mongodb://localhost/${env.db}`;
}
console.log(uri);
mongoose.connect(uri);

const db = mongoose.connection;

db.on('Error',console.error.bind(`Error in connecting to db ${Error}`));

db.once('open',()=>{
    console.log('Successfully connected to database:: MongoDB ');
});

module.exports = db;