const express=require("express");
const fetchuser = require("../Middleware/fetchuser");
const router=express.Router();
const notemodel=require("../Models/Notes")
const User=require("../Models/User");
router.get('/getnotes',fetchuser,async(req,res)=>{

   
  


})
router.post('/createnote',fetchuser,async (req,res)=>{
    const{name,description}=await req.body;
  
        const new_id=req.userId.valueOf()


    const newNote= new notemodel({
        name:name,
        description:description,
        userId: new_id ,
       
    })
    console.log(newNote.userId.valueOf());
   console.log(newNote);
    try {
       const brandnewnote= await newNote.save();
       console.log(brandnewnote);
        res.status(201).json(brandnewnote)
    } catch (error) {
        console.log("fetchingg");
    }
})
module.exports=router