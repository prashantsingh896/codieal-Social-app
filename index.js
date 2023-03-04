const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const port = 8000;
//require for layouts
var expressLayouts = require('express-ejs-layouts');
//require databse
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');

var cors = require('cors');
app.use(cors());

app.use(morgan(env.morgan.mode, env.morgan.options))


//set up the chat server  
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(0);

if(process.env.NODE_ENV=="development"){
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix:'/css'
    }))
}


app.use(express.urlencoded());
app.use(cookieParser());

//where to look for static files(here html, css, js, imgs etc)
app.use(express.static(env.asset_path));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to sotre the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change before deployment
    secret:env.session_cookie_key,
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


app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
