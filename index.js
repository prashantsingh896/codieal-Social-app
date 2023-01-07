const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
//require for layouts
var expressLayouts = require('express-ejs-layouts');
//require databse
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());

//where to look for static files(here html, css, js, imgs etc)
app.use(express.static('./assets'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to sotre the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change before deployment
    secret:"something",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/social-app',
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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
