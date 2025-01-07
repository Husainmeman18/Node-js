const Blog = require("../models/blog");

const getblogs = async (req,res)=>{
    const allBlogs = await Blog.find();
    res.json({
        blogs: allBlogs,
    })
};

const createblogs = (req,res) => {
    const image = req.file.filename;
    const {title ,content ,tags} = req.body;

    Blog.create({title ,content ,tags,image});

    res.json({
        msg:"Blog Created",
    })
};

module.exports = {getblogs,createblogs};