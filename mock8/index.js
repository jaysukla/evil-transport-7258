const express = require('express');
const {connection,User,Product} = require('./model/model')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json())


app.get('/',(req,res)=>{
    res.send({"msg":"Api is Active"})
})

//signup

app.post('/signup', async (req, res) => {
    let {email,password}=req.body;
      bcrypt.hash(password, 5, async function(err, hash) {
     let D = await User.insertMany([{email,'password':hash}])
    
    });
    
      res.status(201).send({"msg":"Registration successfull"});
    });
    
    // Route for user login
    app.post('/login',async (req, res) => {
    
    let {email,password} = req.body;
    let d= await User.find({email});
    let hash =d[0].password;
    
    bcrypt.compare(password, hash, function(err, result) {
     
    if(result==true){
      var token = jwt.sign({}, 'shhhhh');
      res.status(201).send({"msg":"login succes","token":token});
    }else{
        res.send({"msg":"Invalid Credentials"})
    }
    
    });
    
     
    
    
    });
    


    // products 

    app.get("/products",async (req,res)=>{

let data= await  Product.find()
res.send({"data":data})

    })

app.post('/products',async (req,res)=>{
    let data= req.body;
let token = req.headers.auth;


jwt.verify(token, 'shhhhh', async function(err, decoded) {
   if(decoded){
    let d= await Product.insertMany([data])
res.send({"msg":"new product added",'product':d})
   }else{
    res.send({"msg":"login please"})
   }


  });


})


app.delete("/products/:id",async (req,res)=>{
    const Id = req.params.id;
    let token = req.headers.auth;

    jwt.verify(token, 'shhhhh', async function(err, decoded) {
        if(decoded){
            let d = await Product.findByIdAndDelete(Id)

            res.send({"msg":"product deleted","product":d})
        }else{
         res.send({"msg":"login please"})
        }
     
     
       });



  
})



app.put("/products/:id", async(req,res)=>{
let data=req.body
const Id = req.params.id;
let token = req.headers.auth;

jwt.verify(token, 'shhhhh', async function(err, decoded) {
    if(decoded){
        let d= await Product.findByIdAndUpdate(Id,data)
        res.send({"msg":"updated","product":d})
    }else{
     res.send({"msg":"login please"})
    }
 
 
   });



})



app.listen(8080,()=>{

try {
    connection;

console.log("Db connection successfull")


} catch (error) {
    console.log("err from db connection ",err)
}

    console.log("Listning to port 8080")
})