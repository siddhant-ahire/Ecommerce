const express = require('express');
const {create, productById, read, remove,update} = require('../controllers/product');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get('/product/:productId',read);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);


router.param('userId',userById);
router.param('productId',productById);


module.exports = router;