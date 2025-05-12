const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const Movieroute = require("./src/routes/movie");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")))

app.use("/movie",Movieroute);

app.listen(PORT , async ()=>{
    await mongoose.connect("mongodb+srv://Husain18:Husain4856@movies-collection.vlhb9.mongodb.net/Movies-DB");
    console.log("DB Connected");
    console.log(`Server running on ${PORT}`);
})