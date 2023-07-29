



exports.AddNew=async(req,res)=>{
    try {
        res.render('index/Blog',{admin: true})
        
    } catch (error) {
        console.log(error);
    }
}
exports.abott=async(req,res)=>{
    try {
        res.render('index')
        
    } catch (error) {
        console.log(error);
    }
}