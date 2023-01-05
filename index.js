const express = require('express');
const app = express();
const port = 8000;
//require for layouts
var expressLayouts = require('express-ejs-layouts');
//require databse
const db = require('./config/mongoose');


//where to look for static files(here html, css, js, imgs etc)
app.use(express.static('./assets'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//use ejs layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout header
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
