const express = require('express');
const { signup } = require('../controllers/user');
const { check, body } = require('express-validator')
const router = express.Router();

router.post('/signup',
check('name').notEmpty(),
check('email')
.isEmail()
.withMessage('this email is invalid')
.normalizeEmail()

//check in database 
// .custom((value, { req }) => {
//     return User.findOne({ email: value })
//         .then(userDoc => {
//             if (userDoc) {
//                 return Promise.reject('Email already Exists.')
//             }
//         })
// })
,
body('password', 'password is required')
    .isLength({ min: 5 })
    .withMessage('Password must contain at least 6 characters')
    .isAlphanumeric()
    .trim()
,signup)

module.exports = router;