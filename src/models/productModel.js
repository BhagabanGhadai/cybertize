const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    lowercase: true
},
attribute:Array,
sortprice:Number,
categoryid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'categories'
}

}, { timestamps: true })


module.exports = mongoose.model('product', productSchema)