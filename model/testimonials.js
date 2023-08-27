



const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  text: String,
  serviceAquired: String
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;