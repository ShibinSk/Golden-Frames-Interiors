const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const upload =require('../utils/multer')
const cloudinary =require('../utils/cloudinary')
const fs=require('fs');
const Gallery = require("../model/adminIGalleryModel");
exports.adminLoginGet = async (req, res) => {
  try {
    res.render("admin/adminLogin", { navside: true });
  } catch (error) {
    console.log(error);
  }
};

exports.adminLoginPost = async (req, res) => {
  try {
    const result = await Admin.findOne({ email: req.body.email });
    if (!result) {
      res.render("admin/adminLogin", {
        navside: true,
        message: "incorrect Email",
      });
    } else {
      res.render("admin/adminHome", { admin: true, message: "Logged" });
    }

    if (
      result.password &&
      !(await bcryptjs.compare(req.body.password, result.password.toString()))
    ) {
      res.render("admin/adminLogin", {
        navside: true,
        message: "incorrect password",
      });
    }

    // console.log(req.body);
    // const pass= await bcrypt.hash(req.body.password, 10);
    // const admin= new Admin({
    //     email: req.body.email,
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName,
    //     password: pass,
    //     testimonials:null,
    //     access:true,
    // })

    // await admin.save()

    // res.render('admin/adminHome' ,{admin:true, message:'Logged'})
  } catch (error) {
    console.log(error);
  }
};

exports.adminGetGallery = async (req, res) => {
  try {
    res.render("admin/adminGallery", { admin: true });
  } catch (error) {}
};

exports.addGalleryImages = async (req, res) => {
  try {
    res.render("admin/addGalleryImages", { admin: true });
  } catch (error) {
    console.log(error);
  }
};
exports.addGalleryImagesPost = async (req, res) => {
  try {
    const uploder = async (path) => await cloudinary.uploads(path, "Gallery");

    // Fetch the existing document from the collection
    const existingDocument = await Gallery.findOne({});

    let url = [];
    if (existingDocument && existingDocument.image) {
      url = existingDocument.image;
    }

    const images = req.files;
    for (const image of images) {
      const { path } = image;
      const newPath = await uploder(path);
      url.push(newPath); // Push the new URL into the existing array
      fs.unlinkSync(path);
    }

    // If the existingDocument is null, create a new document
    if (!existingDocument) {
      const newGallery = new Gallery({
        image: url,
        alt: req.body.alt,
      });
      await newGallery.save();
    } else {
      // Update the existing document with the new URLs
      existingDocument.image = url;
      existingDocument.alt = req.body.alt; // Update the alt field if needed
      // Save the updated document back to the collection
      await existingDocument.save();
    }

    res.render("admin/addGalleryImages", { admin: true });
  } catch (error) {
    console.log(error);
  }
};
