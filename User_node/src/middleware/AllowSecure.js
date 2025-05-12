const allowSecure = (req,res,next)=>{
    res.header('Access-Control-Allow-Crendentials',true)
    next()
}
module.exports = { allowSecure }