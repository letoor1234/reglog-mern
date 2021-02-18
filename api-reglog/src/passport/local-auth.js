const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

const User=require('../models/users');
//passport methods
passport.serializeUser((user, done)=>{//return session saveing after pss.use(lcl-strateg, new lclStr)
	done(null, user._id);
})

passport.deserializeUser(async (id, done)=>{//return user from database after serializeUser
    const user = await User.findById(id);
    done(null, user);
})
//using strategy
passport.use('local-register', new localStrategy({
    usernameField: "user",
    passwordField: "pass",
    passReqToCallback: true
}, async (req, user, pass, done)=>{
    const mailYet= await User.findOne({'mail':req.body.mail});//debe ser asincrono!!!
    if(mailYet){
        return done(null, false, {mailExist: true, userExists: false});
    } else{
        const userYet=await User.findOne({'user': user});
        if(userYet){
           return done(null, false, {mailExist: false, userExist: true}); 
        } else{
            const newUser =new User();//using model
            newUser.user = user; 
            newUser.mail = req.body.mail;
            newUser.pass = newUser.hashPassword(pass);
            await newUser.save();//set and save model data
            done(null, newUser, {mailExist: false, userExist: false});//return of strategy(err, data)
        }
    }
}))

passport.use('local-login', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done)=>{
    const userYet= await User.findOne({'user': user});
    if(!userYet){
        return done(null, false, {userExist: false});
    } else {
        const passVerified = bcrypt.compareSync(pass, userYet.pass);
        if(passVerified){
            return done(null, userYet);
        } else{
            return done(null, false, {userExist:true,passVerified: false});
        }
    }
}))