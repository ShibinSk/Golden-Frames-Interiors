const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  // Your other fields...
  Testimonials: [{
    name: String,
    text: String,
    serviceAquired:String
  }],
},{timestamps: true});

const Testimonials = mongoose.model('testimonials', testimonialsSchema);

module.exports = Testimonials;