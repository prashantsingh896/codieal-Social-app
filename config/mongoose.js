const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('Error',console.error.bind(`Error in connecting to db ${Error}`));

db.once('open',()=>{
    console.log('Successfully connected to database:: MongoDB');
});

module.exports = db;