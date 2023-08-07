const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const Gallery = require("../model/adminIGalleryModel");
const Testimonials = require("../model/testimonials");
const HomeBlogData = require("../model/HomeBlogmodel");
const BlogStoryData = require("../model/blogStoryModel");












exports.addBlog = (req, res) => {
    try {
      res.render("admin/add-blog", { admin: true , access: req.session.admin.access, name:req.session.admin.name});
    } catch (error) {}
  };

exports.blogStory = (req, res) => {
    try {
      res.render("admin/blogStory", { admin: true , access: req.session.admin.access, name:req.session.admin.name});
    } catch (error) {}
  };
  
  exports.addBlogPost = async (req, res) => {
    try {
     
      console.log(req.body);
      console.log(req.files)
      const uploder = async (path) => await cloudinary.uploads(path, "HomeBlog");
 console.log(uploder)
  const images = req.files // Check the property name of the files array in req.files
  let url = [];
  console.log(url,"url")
  for (const image of images) {
    const { path } = image;
    const newPath = await uploder(path);
    url.push(newPath); // Push the new URL into the existing array
    fs.unlinkSync(path);
  }
  
      const HomeBlog= new HomeBlogData({
        
          image: url,
          header: req.body.header,
          header1: req.body.header1,
          header2: req.body.header2,
          text: req.body.text,
          text1: req.body.text1,
          text2: req.body.text2,
        
      });
      await HomeBlog.save();
      res.render("admin/success", {admin:true});
  
     
    } catch (error) {
      console.error("Error adding blog post:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  exports.blogStoryPost = async (req, res) => {
    try {
     
      console.log(req.body);
      console.log(req.files)
      const uploder = async (path) => await cloudinary.uploads(path, "BlogStory");
 console.log(uploder)
  const images = req.files // Check the property name of the files array in req.files
  let url = [];
  console.log(url,"url")
  for (const image of images) {
    const { path } = image;
    const newPath = await uploder(path);
    url.push(newPath); // Push the new URL into the existing array
    fs.unlinkSync(path);
  }
  
      const blogStoryData= new BlogStoryData({
          image: url,
          header: req.body.header,
          header1: req.body.header1,
          header2: req.body.header2,
          text: req.body.text,
          text1: req.body.text1,
          text2: req.body.text2,
        
      });
      await blogStoryData.save();
      res.render("admin/success", {admin:true});
  
     
    } catch (error) {
      console.error("Error adding blog post:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  