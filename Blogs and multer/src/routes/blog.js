const express = require("express");
const { getblogs,createblogs } = require("../controllers/blog");
const upload = require("../middlewares/uploadFiles");

const blogroute = express.Router();

blogroute.get("/",getblogs)
blogroute.post("/",upload.single("image"),createblogs)

module.exports = blogroute;