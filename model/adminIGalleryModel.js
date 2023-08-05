const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  // Your other fields...
  image: [{
    url: String,
    id: String,
  }],
  alt: String,
},{timestamps: true});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;