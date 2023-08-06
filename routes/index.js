var express = require("express");
var router = express.Router();
const Gallery = require("../model/adminIGalleryModel");
const Testimonials = require("../model/testimonials");
const HomePageBlog = require("../model/HomeBlogmodel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { admin: false });
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
    const result =  data.map((item) => {
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
    console.log(error)
  }
});

router.get("/Testimonials", async function (req, res, next) {
  try {
    // const testimonial = await Testimonials.find();
    // console.log(testimonial);
    // const testimonialData = testimonial.map((item) => {
    //   const mappedTestimonial = item.Testimonials.map((DataObj) => {
    //     return {
    //       name: DataObj.name,
    //       text: DataObj.text,
    //     };
    //   });

    //   return {
    //     ...item,
    //     Testimonials: mappedTestimonial,
    //   };
    // });

    res.render("index/Testimonials", {
      admin: false,
      // testimonial: testimonial,
      // mappedTestimonial: testimonialData,
    });
  } catch (error) {}
});
router.get("/Blog", async function (req, res, next) {
  try {
    const blogdata = await HomePageBlog.find();
    console.log(blogdata);
    const blogresult =  blogdata.map((item) => {
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,

        };
      });
      return {
        ...item,
        text:item.text,
        text1:item.text1,
        text2:item.text2,
        header:item.header,
        header1:item.header1,
        header2:item.header2,
        image: mappedImages,
      };
    });
    res.render("index/Blog", { admin: false, data: blogdata, mappedData: blogresult });
  } catch (error) {}
});
router.get("/Contact", function (req, res, next) {
  res.render("index/Contact", { admin: false });
});

module.exports = router;
