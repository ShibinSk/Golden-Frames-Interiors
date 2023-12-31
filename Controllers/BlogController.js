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
const Blogs = require("../model/HomeBlogmodel");

exports.addBlog =async (req, res) => {
  try {
    const userName= (await Admin.findOne({_id:req.session.admin._id }))
  const name=userName.name
    res.render("admin/add-blog", {
      admin: true,
      access: req.session.admin.access,
      name,
    });
  } catch (error) {}
};

exports.blogStory = async (req, res) => {
  try {
    const userName= async (await Admin.findOne({_id:req.session.admin._id }))
  const name=userName.name
    res.render("admin/blogStory", {
      admin: true,
      access: req.session.admin.access,
      name,
    });
  } catch (error) {}
};

exports.deleteBlog = async(req, res) => {
  try {
    console.log(req.params.id)
    await Blogs.deleteOne({_id :req.params.id})
    res.redirect("/admin/view-blogs");
  } catch (error) {}
};
exports.editBlog = async(req, res) => {
  try {
    const id = req.query.id;
    console.log(id)
  const data=  await Blogs.findOne({_id :id})
  // console.log(data);
    res.render("admin/editBlog",{admin: true,
      header:data.header,
      header1:data.header1,
      header2:data.header2,
      text:data.text,
      text1:data.text1,
      text2:data.text2,
      image:data.image[0].url,
      _id:data._id,
    });
  } catch (error) {}
};

exports.editBlogPost = async(req, res) => {
  try {
    console.log(req.body, 'Ediredd');
  console.log(req.query.id);
    const newData = await Blogs.updateOne({_id:req.query.id},{
      $set:{
        text:req.body.text,
        text1:req.body.text1,
        text2:req.body.text2,
        header:req.body.header,
        header1:req.body.header1,
        header2:req.body.header2
      }
    })
    res.redirect("/admin/view-blogs");
    console.log(newData); 
    
  } catch (error) {}
};


exports.viewBlog = async (req, res) => {
  try {
    const userName= (await Admin.findOne({_id:req.session.admin._id }))
  const name=userName.name
    const data = await Blogs.find();
    // console.log(data, "data");
    const result = data.map((item) => {
      // Map through the 'image' array inside each object
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,
          _id:item._id
          // Add more properties if needed
        };
      });

      // Return the updated item with the mapped images array
      return {
        ...item,
       
        header: item.header,
        header1: item.header1,
        header2: item.header2,
        text: item.text,
        text1: item.text1,
        text2: item.text2,
        image: mappedImages,
      };
    });

    res.render("admin/view-blogs", {
      data: data,
      mappedData: result,
      admin: true,
      access: req.session.admin.access,
      name,
    });
  } catch (error) {}
};

exports.addBlogPost = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const uploder = async (path) => await cloudinary.uploads(path, "HomeBlog");
    console.log(uploder);
    const images = req.files; // Check the property name of the files array in req.files
    let url = [];
    console.log(url, "url");
    for (const image of images) {
      const { path } = image;
      const newPath = await uploder(path);
      url.push(newPath); // Push the new URL into the existing array
      fs.unlinkSync(path);
    }

    const HomeBlog = new HomeBlogData({
      image: url,
      header: req.body.header,
      header1: req.body.header1,
      header2: req.body.header2,
      text: req.body.text,
      text1: req.body.text1,
      text2: req.body.text2,
      
    });
    await HomeBlog.save();
    res.render("admin/success", { admin: true });
  } catch (error) {
    console.error("Error adding blog post:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.blogStoryPost = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const uploder = async (path) => await cloudinary.uploads(path, "BlogStory");
    console.log(uploder);
    const images = req.files; // Check the property name of the files array in req.files
    let url = [];
    console.log(url, "url");
    for (const image of images) {
      const { path } = image;
      const newPath = await uploder(path);
      url.push(newPath); // Push the new URL into the existing array
      fs.unlinkSync(path);
    }

    const blogStoryData = new BlogStoryData({
      image: url,
      header: req.body.header,
      header1: req.body.header1,
      header2: req.body.header2,
      text: req.body.text,
      text1: req.body.text1,
      text2: req.body.text2,
    });
    await blogStoryData.save();
    res.render("admin/success", { admin: true });
  } catch (error) {
    console.error("Error adding blog post:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.ViewblogStory= async(req,res)=>{
  try {
    const userName= (await Admin.findOne({_id:req.session.admin._id }))
  const name=userName.name
    const data = await BlogStoryData.find();
    // console.log(data, "data");
    const result = data.map((item) => {
      // Map through the 'image' array inside each object
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,
          _id:item._id
          // Add more properties if needed
        };
      });

      // Return the updated item with the mapped images array
      return {
        ...item,
       
        header: item.header,
        header1: item.header1,
        header2: item.header2,
        text: item.text,
        text1: item.text1,
        text2: item.text2,
        image: mappedImages,
      };
    });
    
    res.render("admin/view-blogstory", {
      data: data,
      mappedData: result,
      admin: true,
      access: req.session.admin.access,
      name,
    });
  } catch (error) {}
}

exports.deleteBlogStory = async(req, res) => {
  try {
    console.log(req.params.id)
    await BlogStoryData.deleteOne({_id :req.params.id})
    res.redirect("/admin/view-blogstory");
  } catch (error) {}
};

exports.editBlogStory = async(req, res) => {
  try {
    const id = req.query.id;
    console.log(id)
  const data=  await BlogStoryData.findOne({_id :id})
  // console.log(data);
    res.render("admin/editBlogStory",{admin: true,
      header:data.header,
      header1:data.header1,
      header2:data.header2,
      text:data.text,
      text1:data.text1,
      text2:data.text2,
      image:data.image[0].url,
      _id:data._id,
    });
  } catch (error) {}
};

exports.editBlogStoryPost = async(req, res) => {
  try {
    console.log(req.body, 'Ediredd');
  console.log(req.query.id);
    const newData = await BlogStoryData.updateOne({_id:req.query.id},{
      $set:{
        text:req.body.text,
        text1:req.body.text1,
        text2:req.body.text2,
        header:req.body.header,
        header1:req.body.header1,
        header2:req.body.header2
      }
    })
    res.redirect("/admin/view-blogstory");
    console.log(newData); 
    
  } catch (error) {}
};