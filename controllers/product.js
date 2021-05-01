const formidable = require('formidable');
const _ = require('lodash');
const Product = require('../models/product');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.productById = (req,res,next,id) =>{
    Product.findById(id).exec((err,result)=>{
        if(err || !result){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        req.product = result;
        next();
    });
}


exports.read = (req, res) =>{
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.create = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) =>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }
        //check for all fields
        
        const {name , description, price, category, quantity, shipping} = fields

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error:"all fields are required"
            })
        }

        let product = new Product(fields)

        //1kb = 1000
        //1mb = 100000

        if(files.photo){
            if(files.photo.size > 2000000){
                return res.status(400).json({
                    error:"Image should be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err,result) =>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req,res) =>{
    let product = req.product;
    product.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({message:"Product deleted successfully"})
    })
}

exports.update = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) =>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }
        //check for all fields
        
        const {name , description, price, category, quantity, shipping} = fields

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error:"all fields are required"
            })
        }

        let product = req.product
        product = _.extend(product,fields)

        //1kb = 1000
        //1mb = 100000

        if(files.photo){
            if(files.photo.size > 2000000){
                return res.status(400).json({
                    error:"Image should be less than 1mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err,result) =>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(result)
        })
    })   
}