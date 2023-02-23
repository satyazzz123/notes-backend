const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017";

const connectTomongo=()=>{  
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongodb Succesfully");
    })
}
module.exports=connectTomongo;