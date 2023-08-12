var express = require('express');
var router = express.Router();
const AdminController =require('../Controllers/AdminController')
const BlogHomeController =require('../Controllers/BlogController')
const userMiddlewere=require('../Midalware/adminMidleware')
const upload =require('../utils/multer')
/* GET users listing. */

router.get('/',userMiddlewere.isLogin, AdminController.superadminLoginGet)

router.post('/adminLogin',userMiddlewere.isLogin, AdminController.superadminLoginPost)

router.post('/add-admin',AdminController.adminLoginPost)

router.get('/logout',AdminController.logoutget)


/**
 * ====================================================================================================
 */
router.get('/adminGallery', AdminController.adminGetGallery)

router.get('/addGalleryImages',AdminController.addGalleryImages)

router.post('/addGalleryImages', upload.array('images', 1), AdminController.addGalleryImagesPost);


router.get('/galleryimagedelete/:id',AdminController.DeleteGalleryImages)

router.get('/edit-gallary/:id',AdminController.editGallary)


/**
 * ====================================================================================================
 */

router.get('/add-Testimonials',AdminController.addTestimonials)
router.post('/add-Testimonials',AdminController.addTestimonialsPost)

router.get('/view-Testimonials',AdminController.viewTestimonials)




/**
 * ====================================================================================================
*/

router.get('/add-blog',BlogHomeController.addBlog)
router.post('/add-blog', upload.array('images', 4),BlogHomeController.addBlogPost)

router.get('/view-blogs',BlogHomeController.viewBlog)

router.get('/view-blogs/:id',BlogHomeController.deleteBlog)


router.get('/add-blogStory',BlogHomeController.blogStory)

router.post('/add-blogStory', upload.array('images', 4),BlogHomeController.blogStoryPost)
// router.get('/about',AdminController.abott)



router.get('/view-allUsers',AdminController.ViewAllUsers)

router.get('/dltAdmin/:id',AdminController.dltAdmin)

module.exports = router;

