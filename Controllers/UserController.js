
const Testimonials = require("../model/testimonials");


exports.getTestimonials= async (req,res)=>{
    try { 
        const testimonial = await Testimonials.find(); 
        const mappedTestimonial = testimonial.map((DataObj) => { 
          return { 
            name: DataObj.name, 
            text: DataObj.text, 
            serviceAquired: DataObj.serviceAquired, 
          }; 
        })
            res.render("index/Testimonials", { 
              admin: false, 
              testimonial: mappedTestimonial, 
             
            }); 
     
      } catch (error) {
      res.send(error)
      }
    
    
}