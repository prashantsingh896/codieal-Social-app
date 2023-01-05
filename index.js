const express = require('express');
const app = express();
const port = 8000;
//require for layouts
var expressLayouts = require('express-ejs-layouts');


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//use ejs layouts
app.use(expressLayouts);


//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
