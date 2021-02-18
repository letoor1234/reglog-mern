const express = require('express');
const {mongoose} = require ('./database');
const cors = require('cors');
const passport=require('passport');
const flash = require('connect-flash');

const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const session= require('express-session');
const User = require('./models/users.js');
//Statics here

//Statics here

const app = express();
require('./passport/local-auth');
//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());
var corsOptions={
    origin:'http://localhost:3000',
    credentials: true 
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser('dontSpyIt'));

app.use(session({
    secret: 'dontSpyIt',//no vulnerable,
	resave: false,
	saveUninitialized: false,
    cookie: { sameSite: 'strict' },
}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/api/users', require('./routes/users.routes'));

//Start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});