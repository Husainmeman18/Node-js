const requireAuth = (req,res,next) =>{
    console.log(req.session)
    if(req.session.user){
        next();
    }
    else{
        res.json({msg:"Not Authenication"})
    }
}
module.exports = {requireAuth};