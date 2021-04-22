const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')

//db
mongoose.connect(process.env.DATABASE,{
useNewUrlParser:true,useUnifiedTopology:true 
}).then(()=>console.log("DB Connected")).catch(err=>console.log('DB Not Connected',err));


app.get('/',(req,res)=>{
    res.send('hello world');

})

//middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes middleware
app.use("/api",userRoutes);

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})