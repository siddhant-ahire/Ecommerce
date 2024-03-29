const express = require('express');
const {create, productById, read, remove,update,list,listRelated,listCategories,listBySearch,photo, listSearch } = require('../controllers/product');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get('/product/:productId',read);
router.get('/products/search',listSearch);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.get('/products',list)
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.post('/products/by/search',listBySearch)
router.get('/product/photo/:productId',photo)

router.param('userId',userById);
router.param('productId',productById);


module.exports = router;