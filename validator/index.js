exports.userSignupValidator = {
    name: {
        // custom: {
        //     options: value => {
        //         return User.find({
        //             username: value
        //         }).then(user => {
        //             if (user.length > 0) {
        //                 return Promise.reject('Username already in use')
        //             }
        //         })
        //     }
        // }
        notEmpty:true,
        errorMessage:"Name is required"
    },
    // gender: {
    //     notEmpty: true,
    //     errorMessage: "Gender field cannot be empty"
    // },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    // phone: {
    //     notEmpty: true,
    //     errorMessage: "Phone number cannot be empty"
    // },
    email: {
        isEmail:{
            bail:true
        },
        errorMessage:"email address is invalid"
        // normalizeEmail: true,
        // custom: {
        //     options: value => {
        //         return User.find({
        //             email: value
        //         }).then(user => {
        //             if (user.length > 0) {
        //                 return Promise.reject('Email address already taken')
        //             }
        //         })
        //     }
        // }
    }
}










































// exports.userSignupValidator = (req,res,next) =>{
//     req.check('name','Name is required').notEmpty();
//     req.check('email','Email must be between 3 to 32 characters')
//         .matches(/.+\..+/)
//         .withMessage('Email must contain @')
//         .isLenth({
//             min:4,
//             max:32
//         })
//         req.check('password','Password is required').notEmpty()
//         req.check('password')
//             .isLenth({min:6})
//             .withMessage('Password must contain at least 6 characters')
//             .matches(/\d/)
//             .withMessage('Password must contain a number');
//             const error = req.validationError();
//             if(error){
//                 const firstError = error.map(error=> error.msg)[0];
//                 return res.status(400).json({error:firstError})
//             }
//             next();
// }