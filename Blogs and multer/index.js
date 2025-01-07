const express = require("express");
const cors = require("cors");
// const BlogRoutes = require("./src/routes/blog");
const mongoose = require("mongoose");
const path = require("path");
const blogroute = require("./src/routes/blog");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))

app.use("/blog",blogroute);
app.listen(PORT, async ()=>{
    await mongoose.connect("mongodb://localhost:27017/Crud");
    console.log("DB Connected");
    console.log(`sever running on http://localhost:${PORT}/`);
})