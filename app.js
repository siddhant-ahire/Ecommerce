const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')


const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }

//db
mongoose.connect(process.env.DATABASE,options)
.then(()=>console.log("DB Connected")).catch(err=>console.log('DB Not Connected',err));


app.get('/',(req,res)=>{
    res.send('hello world');

})

//middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);


const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})