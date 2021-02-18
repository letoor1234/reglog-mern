const express = require ('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const router = express.Router();
const passport=require('passport');

const salt = 10; 
const User=require('../models/users');

router.get ('/', async (req, res)=>{
    const user = await User.find();

    res.json(user); 
});


router.post('/register', (req,res,next)=> {
	passport.authenticate('local-register', (err,user,info)=>{
		const newUser = user.user;
		const mail = user.mail;
		const pass = user.pass;
		if(!err){
			if(!user){
				res.json(info);
			} else{
				req.login(user, (err)=>{
					console.log(err);
				});
				res.json(user);
			}
		} else{
			console.log(err);
		}
	})(req, res, next);
});
  
router.post('/login', async (req,res, next)=>{
	passport.authenticate('local-login', async(err, user, info)=>{
		if(!err){
			if(!user){
				res.json(info);
			} else{
				
				req.login(user, (err)=>{
					if(err){
						console.log(err);
					}
					return res.json(req.user);
					
				});
			}
		} else{
			console.log(err);
		}
		
	})(req, res, next);
});

router.get('/auth',  (req, res)=>{
	if(req.isAuthenticated()){
		res.json(req.user);
	}else{
		res.json({isAuthenticated: false});
	}
});

router.get('/logout', (req, res)=>{
	req.logout();
	res.json({loguedOut: true});
})


module.exports = router;