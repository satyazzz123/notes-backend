const express=require("express");
const router=express.Router();
const User=require("../Models/User");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Jwt_secret="gulumuluismine";
const fetchuser=require("../Middleware/fetchuser");
const cookieParser = require('cookie-parser');
router.use(cookieParser())


//ROUTE_1:Create a user using POST "/api/auth/createuser".Doesnt require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 1 }),
    body('email','Enter a valid email').isEmail(),
    body('password','password is too short').isLength({ min: 5 })
],async(req,res)=>{
    //Errors to be filtered below
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//finding the user with same email address
try {
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"sorry user with this email exists"})
    }
    //create a new user
    const salt=await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt)
 
   user= await  User.create({
        name: req.body.name,
        email:req.body.email,
        password: secpass,
        
      })
      
      
      
    //   .then(user => res.json(user)).catch(err=>{console.log(err)
    // res.json({error:'Please enter a valid Email '})
    // });

    //sending data here in jwt signature to retrieve data
    const data={
        user:{
            id:user.id
        }
    }
    // jwt signature
    const authtoken=  jwt.sign({name:user.name,email:user.email,id:user._id},Jwt_secret);
      console.log(authtoken);



res.json(authtoken)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
    
}
   
})

//ROUTE_2:Authenticate a User :POST "/api/auth/login"


router.post('/login',[
   
    //validation
    body('email','Enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{name,email,password}=req.body;
    try {
       let user=await User.findOne({email:email});
       if(!user){
        return res.status(400).json({error:"Please input correct credentials"})
       }
       const passwordcompare=await bcrypt.compare(password,user.password)
       if(!passwordcompare){
        return res.status(400).json({error:"Please input correct credentials"})
       }
    //    const data={
    //     user:{
    //         // id:user.id
    //         email:user.email
    //     }
    // }
    // jwt signature
    const authtoken=  jwt.sign({name:user.name,email:user.email,id:user._id},Jwt_secret);
    // console.log(data);
      console.log(authtoken);
      res.send(authtoken)
      //cookies
    //   const options={
    //     expires:new Date(Date.now()+3*24*60*60*1000),
    //     httpOnly:true
    //   };
    //   res.status(200).cookie("auth-token",authtoken,options).json(authtoken)
    //   console.log(req.cookies);




    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
        
        
    }
  
    })

//ROUTE_3:get user details POST /api/auth/getuser.LOGIN requiured

router.post('/getuser',fetchuser,async(req,res)=>{
  


   try {
    
      const  userid=req.userId
      const userdata= req.user_data
      console.log(userid);
    // const user=await User.findById(userdata).select("-password")

    res.send(userdata)

    
 
   } catch (error) {
    console.log(error.message);
    res.status(500).send({mess:"internal server error"})
    
   }
  


     
    
    
    })

  

 


module.exports=router