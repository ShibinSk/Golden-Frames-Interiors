const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const Gallery = require("../model/adminIGalleryModel");
const Testimonials = require("../model/testimonials");
const HomeBlogData = require("../model/HomeBlogmodel");
const { ObjectId, default: mongoose } = require('mongoose');
const session = require("express-session");


exports.superadminLoginGet = async (req, res) => {
  try {
    if(req.session.loggedIn){
      res.render("admin/adminHome", { admin: true, message: "Logged",data: req.session.admin});
    }else{

      res.render("admin/adminLogin", { navside: true });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.superadminLoginPost = async (req, res) => {
  try {
    console.log(session,"session")

    const result = await Admin.findOne({ email: req.body.email });

    // req.session.admin=result;

    if (!result) {
      res.render("admin/adminLogin", {
        navside: true,
        message: "Incorrect Email",
      });
    } else {
      req.session.admin = result;
      req.session.loggedIn = true;
      console.log( req.session.admin.access, " req.session.admin")
      res.render("admin/adminHome", { admin: true, message: "Logged", access: req.session.admin.access, name:req.session.admin.name });
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
    //     name:req.body.lastName,
    //     password: pass,
    //     access:true,
    // })

    // await admin.save()
    
    // req.session.email=req.body.email,
    // // req.session.email=req.email.email,
    // console.log(req.session.email, "session")
    // console.log(res.session.user)

    // res.render('admin/adminHome' ,{admin:true, message:'Logged'})
  } catch (error) {
    console.log(error);
  }
};
exports.adminLoginPost = async (req, res) => {
  try {
    // const result = await Admin.findOne({ email: req.body.email });
    // if (!result) {
    //   res.render("admin/adminLogin", {
    //     navside: true,
    //     message: "Already Exit",
    //   });
    // } else {
    //   res.render("admin/adminHome", { admin: true, message: "Logged" });
    // }

    // if (
    //   result.password &&
    //   !(await bcryptjs.compare(req.body.password, result.password.toString()))
    // ) {
    //   res.render("admin/adminLogin", {
    //     navside: true,
    //     message: "incorrect password",
    //   });
    // }

    console.log(req.body);
    const pass= await bcrypt.hash(req.body.password, 10);
    const admin= new Admin({
        email: req.body.email,
        name:req.body.name,
        password: pass,
        access:false,
    })

    await admin.save()

    res.render("admin/successddAdmin", { admin: true ,message:"Added New Admin"});
  } catch (error) {
    console.log(error);
  }
};

exports.logoutget=(req,res)=>{
  req.session.destroy()
  res.render("admin/adminLogin", { navside: true });
}


exports.adminGetGallery = async (req, res) => {
  try {

    const data = await Gallery.find();
    console.log(data, "data")
    const result = data.map((item) => {
      // Map through the 'image' array inside each object
      const mappedImages = item.image.map((imageObj) => {
        return {
          imageUrl: imageObj.url,
          alt: item.alt,
          _id:imageObj._id

        
          // Add more properties if needed
        };
      });

      // Return the updated item with the mapped images array
      return {
        ...item,
        image: mappedImages,
      };
    });

    console.log(result[0]);

    // Pass both the original 'data' array and the mapped 'result' array to the view
    // res.render("index/Gallery", {
    //   admin: false,
    //   data: data,
    //   mappedData: result,
    // });

    res.render("admin/adminGallery", { admin: true,data: data, mappedData: result, access: req.session.admin.access, name:req.session.admin.name });
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
        _id: new mongoose.Types.ObjectId(),
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

    res.redirect("/admin/adminGallery");
  } catch (error) {
    console.log(error);
  }
};


exports.DeleteGalleryImages = async (req, res) => {
  try {
    console.log(req.params.id)
    // const result = await Gallery.deleteOne(
    //   {},
    //   { $pull: { image: { _id: ObjectId(req.params.id)  } } }
    // );
    res.redirect("/admin/adminGallery");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.editGallary = async (req, res) => {
  try {
    console.log(req.params.id)
    const datas = await Gallery.findByIdAndUpdate({_id:req.params.id})
    console.log(datas)
    res.render("admin/addGalleryImages", { admin: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.addTestimonials = (req, res) => {
  try {
    res.render("admin/add-Testimonials", { admin: true , access: req.session.admin.access, name:req.session.admin.name});
  } catch (error) {}
};
exports.addTestimonialsPost = async (req, res) => {
  try {
    console.log(req.body);
    // await Testimonials.insertMany(req.body)
    const newtestimonials = new Testimonials({
      Testimonials: {
        name: req.body.name,
        text: req.body.text,
        serviceAquired: req.body.serviceAquired
      },
    });
    await newtestimonials.save();
    res.render("admin/successTest", { admin: true });
  } catch (error) {}
};


exports.ViewAllUsers= async(req,res)=>{
  try {

const data=await Admin.find({access:"false"})
console.log(data)
const result =data.map((item)=>{
  return{
    name: item.name,
    email: item.email,
    id:item._id
  }
})
console.log(result,"data")

   res.render("admin/view-allUsers", { admin: true, users:result });
    
  } catch (error) {
    console.log(error)
  }
}

exports.dltAdmin= async(req,res)=>{
  try {
console.log(req.params.id)
const data=await Admin.deleteOne({_id:req.params.id})
// console.log(result,"data")

  //  res.render("admin/view-allUsers");
   res.redirect('/admin/view-allUsers');
    
  } catch (error) {
    console.log(error)
  }
}