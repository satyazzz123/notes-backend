var jwt = require('jsonwebtoken');
const User=require("../Models/User");
const Jwt_secret="gulumuluismine"
const fetchuser=(req,res,next)=>{
   const token=req.headers["auth-token"];
   if(!token)
   {
    res.status(401).send({erroe:"miidle"})
   }
  try {
    const data=jwt.verify(token,Jwt_secret)
  
    // req.user=data.user
    req.userId=data.id
  
    // console.log(token);
    console.log(req.userId);
    const decode=jwt.decode(token);
    req.user_data=decode
    console.log(decode);
    next()
  } catch (error) {
    res.status(401).send({error:"afafafaf"})
    
  }
}
module.exports=fetchuser;