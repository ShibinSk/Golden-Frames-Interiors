var express = require('express');
var router = express.Router();
const AdminController =require('../Controllers/AdminController')
const BlogHomeController =require('../Controllers/BlogController')
const userMiddlewere=require('../Midalware/adminMidleware')
const upload =require('../utils/multer')
/* GET users listing. */

// router.get('/',userMiddlewere.isLogin, AdminController.superadminLoginGet)
router.get('/',AdminController.superadminLoginGet)

router.post('/adminLogin',userMiddlewere.isLogin, AdminController.superadminLoginPost)

router.post('/add-admin',AdminController.adminLoginPost)

router.get('/logout',AdminController.logoutget)

router.get('/editName',AdminController.editName)

router.post('/editName',AdminController.editNamePost)


/**
 * ====================================================================================================
 */
router.get('/adminGallery',userMiddlewere.isLogout, AdminController.adminGetGallery)

router.get('/addGalleryImages',AdminController.addGalleryImages)

router.post('/addGalleryImages', upload.array('images', 1), AdminController.addGalleryImagesPost);


router.get('/galleryimagedelete/:id',AdminController.DeleteGalleryImages)

router.get('/edit-gallary/:id',AdminController.editGallary)


/**
 * ====================================================================================================
 */

router.get('/add-Testimonials',userMiddlewere.isLogout,AdminController.addTestimonials)
router.post('/add-Testimonials',AdminController.addTestimonialsPost)

router.get('/view-Testimonials',AdminController.viewTestimonials)

router.get('/delete-Testimonials',AdminController.deleteTestimonials)

router.get('/edit-Testimonials',AdminController.editTestimonials)
router.post('/edit-Testimonials',AdminController.editTestimonialsPost)




/**
 * ====================================================================================================
*/

router.get('/add-blog',userMiddlewere.isLogout,BlogHomeController.addBlog)
router.post('/add-blog', upload.array('images', 4),BlogHomeController.addBlogPost)

router.get('/view-blogs',BlogHomeController.viewBlog)

router.get('/view-blogs/:id',BlogHomeController.deleteBlog)

router.get('/edit-blogs',BlogHomeController.editBlog)

router.post('/edit-blogs',BlogHomeController.editBlogPost)


router.get('/add-blogStory',userMiddlewere.isLogout,BlogHomeController.blogStory)

router.post('/add-blogStory', upload.array('images', 4),BlogHomeController.blogStoryPost)
// router.get('/about',AdminController.abott)
router.get('/view-blogStory',userMiddlewere.isLogout,BlogHomeController.ViewblogStory)
router.get('/delete-blogStory/:id',userMiddlewere.isLogout,BlogHomeController.deleteBlogStory)

router.get('/edit-blogstory',userMiddlewere.isLogout,BlogHomeController.editBlogStory)
router.post('/edit-blogstory',userMiddlewere.isLogout,BlogHomeController.editBlogStoryPost)



router.get('/view-allUsers',AdminController.ViewAllUsers)

router.get('/dltAdmin/:id',AdminController.dltAdmin)

router.get('/edit-user',AdminController.editAdmin)

router.post('/edit-user',AdminController.editAdminPost)

module.exports = router;

