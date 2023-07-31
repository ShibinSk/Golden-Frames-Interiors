



exports.adminLoginGet=async(req,res)=>{
    try {
        res.render('admin/adminLogin', {navside:true})
        
    } catch (error) {
        console.log(error);
    }
}

exports.adminLoginPost=async(req,res)=>{
    try {
        console.log(req.body);
        res.render('admin/adminHome' ,{admin:true})
    } catch (error) {
        console.log(error);
    }
}
