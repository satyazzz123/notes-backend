const mongoose= require('mongoose')
const { Schema } = mongoose;

const noteSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       
    },
    timestamp:{
        type:Date,
        required:Date.now
    }
  });
  module.exports=mongoose.model('notes',noteSchema)