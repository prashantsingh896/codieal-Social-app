const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social-app');

const db = mongoose.connection;

db.on('Error',console.error.bind(`Error in connecting to db ${Error}`));

db.once('open',()=>{
    console.log('Successfully connected to database:: MongoDB');
});

module.exports = db;