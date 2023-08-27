// const mongoose = require('mongoose');

// const testimonialsSchema = new mongoose.Schema({
//   // Your other fields...
//   Testimonials: [{
//     name: String,
//     text: String,
//     serviceAquired:String
//   }],
// },{timestamps: true});

// const Testimonials = mongoose.model('testimonials', testimonialsSchema);

// module.exports = Testimonials;



const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  text: String,
  serviceAquired: String
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;