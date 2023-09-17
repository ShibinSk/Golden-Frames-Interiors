var express = require("express");
var router = express.Router();
const Gallery = require("../model/adminIGalleryModel");
const Testimonials = require("../model/testimonials");
const HomePageBlog = require("../model/HomeBlogmodel");
const storyBlog = require("../model/blogStoryModel");
const UserController =require('../Controllers/UserController')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");

router.get("/Testimonials", UserController.getTestimonials)

});
router.get("/about", function (req, res, next) {
  res.render("index/About", { admin: false });
});
router.get("/services", function (req, res, next) {
  res.render("index/Services", { admin: false });
});
router.get("/gallery", async function (req, res, next) {
  try {
    const data = await Gallery.find();
    const result = data.map((item) => {
      // Map through the 'image' array inside each object
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,
          alt: item.alt,
          // Add more properties if needed
        };
      });

      // Return the updated item with the mapped images array
      return {
        ...item,
        image: mappedImages,
      };
    });

    // Pass both the original 'data' array and the mapped 'result' array to the view
    res.render("index/Gallery", {
      admin: false,
      data: data,
      mappedData: result,
    });
  } catch (error) {
    console.log(error);
  }
});

 
router.get("/Blog", async function (req, res, next) {
  try {
    const blogdata = await HomePageBlog.find().sort({ updatedAt: -1 }).limit(1) // Sort by updatedAt in descending order
    console.log(blogdata);
    const blogresult = blogdata.map((item) => {
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,
        };
      });
      return {
        ...item,
        text: item.text,
        text1: item.text1,
        text2: item.text2,
        header: item.header,
        header1: item.header1,
        header2: item.header2,
        image: mappedImages,
      };
    });
    const Storyblogdata = await storyBlog.find().sort({ updatedAt: -1 }).limit(3)
    console.log(Storyblogdata);
    const Storyblogresult = Storyblogdata.map((item) => {
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,
          _id: item._id,
        };
      });
      return {
        ...item,
        text: item.text,
        text1: item.text1,
        text2: item.text2,
        header: item.header,
        header1: item.header1,
        header2: item.header2,
        image: mappedImages,
      };
    });
    res.render("index/Blog", {
      admin: false,
      data: blogdata,
      mappedData: blogresult,
      storyDataMapped: Storyblogresult,
      storyData: Storyblogdata,
    });
  } catch (error) {}
});

router.get("/Blog-Story-page1", async function (req, res) {
  try {
    console.log(req.query.id);
    const id = req.query._id;
    const data = await storyBlog.findOne({ _id: req.query.id });
    console.log(data.image[0].url, "data");
   
    res.render("index/Blog-Story-page1", {
      admin: false,
      header:data.header,
      header1:data.header1,
      header2:data.header2,
      text:data.text,
      text1:data.text1,
      text2:data.text2,
      image:data.image[0].url,
    
    });

    // res.render("index/Blog-Story-page1");
  } catch (error) {
    console.log(error);
  }
});

router.get("/Contact", function (req, res, next) {
  res.render("index/Contact", { admin: false });
});


router.get("/Kitchen", function (req, res, next) {
  res.render("index/Kitchen-cabinets", { admin: false });
});
router.get("/Wardrobes", function (req, res, next) {
  res.render("index/Wardrobes", { admin: false });
});
router.get("/TV-units", function (req, res, next) {
  res.render("index/TV-units", { admin: false });
});
router.get("/Customised-furniture", function (req, res, next) {
  res.render("index/Customised-furniture", { admin: false });
});
router.get("/Office-Interior", function (req, res, next) {
  res.render("index/Office-Interior", { admin: false });
});

module.exports = router;
