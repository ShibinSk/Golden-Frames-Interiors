
const Testimonials = require("../model/testimonials");


exports.getTestimonials= async (req,res)=>{
    try { 
        const testimonial = await Testimonials.find(); 
        if(testimonial){
            console.log(testimonial); 
            const testimonialData = testimonial.map((item) => { 
              const mappedTestimonial = item.Testimonials.map((DataObj) => { 
                return { 
                  name: DataObj.name, 
                  text: DataObj.text, 
                  serviceAquired: DataObj.serviceAquired, 
                }; 
              }); 
         
              return { 
                ...item, 
                Testimonials: mappedTestimonial, 
              }; 
            }); 
            res.render("index/Testimonials", { 
              admin: false, 
              testimonial: testimonial, 
              mappedTestimonial: testimonialData, 
            }); 

        }else{
            
            res.send('note found')
        }
     
      } catch (error) {
      res.send(error)
      }
    
    
}