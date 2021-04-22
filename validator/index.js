exports.userSignupValidator = (req,res,next) =>{
    req.check('name','Name is required').notEmpty();
    req.check('email','Email must be between 3 to 32 characters')
        .matches(/.+\..+/)
        .withMessage('Email must contain @')
        .isLenth({
            min:4,
            max:32
        })
        req.check('password','Password is required').notEmpty()
        req.check('password')
            .isLenth({min:6})
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number');
            const error = req.validationError();
            if(error){
                const firstError = error.map(error=> error.msg)[0];
                return res.status(400).json({error:firstError})
            }
            next();
}