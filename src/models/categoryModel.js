const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    lowercase: true
},

image: {
  type:String,
  required: true,
},

}, { timestamps: true })


module.exports = mongoose.model('category', categorySchema)