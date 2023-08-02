var express = require('express');
var router = express.Router();
const Gallery =require('../model/adminIGalleryModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { admin: false});
});
router.get('/about', function (req, res, next) {
  res.render('index/About',  { admin: false});
});
router.get('/services', function (req, res, next) {
  res.render('index/Services',  { admin: false});
});
router.get('/gallery', async function (req, res, next) {

  try {
    const data = await Gallery.find();
const result = data.map((item) => {
  // Map through the 'image' array inside each object
  const mappedImages = item.image.map((imageObj) => {
    return {
      imageUrl: imageObj.url,
      // Add more properties if needed
    };
  });

  // Return the updated item with the mapped images array
  return {
    ...item,
    image: mappedImages,
  };
});

console.log(result);

// Pass both the original 'data' array and the mapped 'result' array to the view
res.render('index/Gallery', { admin: false, data: data, mappedData: result });

  } catch (error) {
    
  }

});


module.exports = router;
