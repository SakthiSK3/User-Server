const express =require ("express");
const app=express();
const mongoose =require('mongoose');
const UsersRoute=require('./UsersRoute');
const morgan =require('morgan')
const cors =require('cors');

app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors());  
app.use('/api',UsersRoute);     

app.listen(5000,()=>{
    console.log("server connected sucessfully")
})  


mongoose.connect('mongodb://localhost:27017/userAuth',{ useNewUrlParser: true  , useUnifiedTopology: true },()=>{
    console.log("Data base server connected sucessfully")
})