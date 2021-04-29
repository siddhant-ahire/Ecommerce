const express = require('express');
const { signup, signin ,signout} = require('../controllers/auth');
const { check, body, checkSchema } = require('express-validator');
const { userSignupValidator } = require('../validator');
const router = express.Router();

router.post('/signup',checkSchema(userSignupValidator),signup);
router.post('/signin',signin);
router.get('/signout',signout);



module.exports = router;