const mongoose = require('mongoose')

ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        minlength:2,
        trim:true
    },

    email:{
        type:String,
        required:true,
        maxlength:50,
        minlength:2,
        trim:true

    },
    // phones:
    // [{
         phone: {
            type: String,
            trim:true,
            required: true
        },
  //  }]

  creator:{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
}
   
})


const Contact = mongoose.model('Contact',ContactSchema)
module.exports = Contact