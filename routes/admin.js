var express = require('express');
var router = express.Router();
const AdminController =require('../Controllers/AdminController')
const upload =require('../utils/multer')
/* GET users listing. */

router.get('/',AdminController.adminLoginGet)

router.post('/adminLogin',AdminController.adminLoginPost)
/**
 * ====================================================================================================
 */
router.get('/adminGallery',AdminController.adminGetGallery)

router.get('/addGalleryImages',AdminController.addGalleryImages)

router.post('/addGalleryImages', upload.array('images', 4), AdminController.addGalleryImagesPost);
/**
 * ====================================================================================================
 */

router.get('/add-Testimonials',AdminController.addTestimonials)
router.post('/add-Testimonials',AdminController.addTestimonialsPost)




/**
 * ====================================================================================================
*/

router.get('/add-blog',AdminController.addBlog)
// router.get('/about',AdminController.abott)
module.exports = router;
