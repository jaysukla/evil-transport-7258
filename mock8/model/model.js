const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb+srv://JayShukla:jayshukla@cluster0.9zippbx.mongodb.net/Mock8')


const User= mongoose.model('User',mongoose.Schema({
   
  email: String,
  password: String
  
}));



const Product= mongoose.model('Product',mongoose.Schema({
   
    name:String,
    description:String,
    category:String,
    image:String,
    location:String,
    postedAt:Date,
    price:Number
 
    
  }));
  
  






module.exports={connection,User,Product}