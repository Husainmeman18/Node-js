const express = require("express");
const cors = require("cors");
const connectDB = require("./src/Config/DbConfig");
const UserRoutes = require("./src/route/user")
const cookieparser = require("cookie-parser")
const session = require("express-session")
const {allowSecure} = require("./src/middleware/AllowSecure");
const MongoStore = require("connect-mongo")(session);

const app = express();
app.use(cors());
require('dotenv').config()
app.use(cookieparser())

app.use(session({
    secret:"mySuperSecretKey",
    resave:false,
    saveUninitialized:true,
    store: new MongoStore({
        url:process.env.MONGO_URL,
        ttl: 14 * 24 * 60 * 60,
        autoRemove : 'native'
    }) 
}))


app.use(express.json())
app.use(allowSecure);

app.get("/get",(req,res)=>{
    console.log(req.cookies)
    res.json({
        msg:"Get"
    })
})

app.get("/set",(req,res)=>{
    res.json({
        msg:"Set"
    })
})


app.use("/user",UserRoutes)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    connectDB();
    console.log("Db has been connected successfully")
})