const { validationResult } = require('express-validator');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressjwt = require('express-jwt');// for authorization check
const User = require('../models/user');

exports.signup = (req,res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        let errorMessage = error.array();
        return res.status(400).json({error:errorMessage[0].msg})
    }
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
            user
        })
    })
}

exports.signin = (req,res,next) =>{
    //find the user based on email
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'User with that email does not exist.please signup'
            })
        }
        //if user is found make sure the email and password match 
        //create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Email and Password dont match'
            })
        }
        //generate a signed token with use id and secret

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date 
        res.cookie('t',token,{expire:new Date() + 9999})
        // return response with use and token to fontend client
        const {_id , name , email, role} = user;
        return res.status(200).json({token,user:{_id,email,name,role}})
    })
}

exports.signout = (req,res) =>{
    res.clearCookie('t');
    res.json({message:'Signedout successful'})
}

exports.requireSignin = expressjwt({
    secret:process.env.JWT_SECRET,
    userProperty:'auth',
    algorithms:['HS256']
    
})

exports.isAuth = (req,res,next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error:'Access denied'
        });
    }
    next();
}

exports.isAdmin = (req,res,next) =>{
    if(req.profile.role === 0) {
        return res.status(403).json({
            error:'Admin resourse! Access denied'
        })
    }
    next();
}