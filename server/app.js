const path = require('path');
const express =  require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postRouter = require('./routers/posts')
const userRouter = require('./routers/user');

mongoose.connect('mongodb+srv://osama:'+ process.env.MONGODB_ATLAS_PW +'@cluster0.asmfbgl.mongodb.net/node').then(()=>{
  console.log("Connected to the Database");
}).catch(()=>{
  console.log("Failed to Connect to Database");
});

app.use(bodyparser.json());
app.use("/images",express.static(path.join("server/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , x-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, OPTIONS, DELETE"
    );
  next();
});

app.use('/api/posts',postRouter);
app.use('/api/user',userRouter);

module.exports = app;
