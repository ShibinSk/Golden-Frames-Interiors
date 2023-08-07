const mongoose = require("mongoose");

const BlogStorySchema = new mongoose.Schema({
  // Your other fields...
  
    image: [{
      url: String,
      id:String
    }],
    header: {type: String, required: false},
    text: {type: String, required: false},
    header1: {type: String, required: false},
    text1: {type: String, required: false},
    header2: {type: String, required: false},
    text2: {type: String, required: false},
  
},{timestamps: true});

const HomeStoryBlog = mongoose.model("BlogStorySchema", BlogStorySchema);

module.exports = HomeStoryBlog;
