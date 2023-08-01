const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");

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
exports.addGalleryImages = async (req, res) => {
  try {
    res.render("admin/addGalleryImages", { admin: true });
  } catch (error) {
    console.log(error);
  }
};
