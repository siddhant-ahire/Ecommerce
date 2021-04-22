const { validationResult } = require('express-validator');
const { errorHandler } = require('../helpers/dbErrorHandler');
const User = require('../models/user')

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
                err:errorHandler(err)
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
            user
        })
    })
}