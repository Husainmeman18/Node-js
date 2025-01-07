const express = require("express");

const app = express();

const PORT = 8000;

const Users = []
app.use(express.json());

app.get("/users",(req,res) =>{
    res.json({
        user:Users
    })
})

app.get("/users/:user_id",(req,res) =>{
    const user_id = Number(req.params["user_id"]);
    if(isNaN(user_id)){
        return res.json({
            msg:"Invalid URL"
        })
    }else if(!Users[user_id]){
        return res.json({
            msg:"This User Does not Exist"
        })
    }else{
        return res.json({
            user:Users[user_id]
        })
    }
})

app.post("/users",(req,res) =>{
    Users.push(req.body);
    res.json({
        msg:"User Added"
    })
})

app.delete("/users/:user_id",(req,res) =>{
    const user_id = Number(req.params["user_id"]);
    if(isNaN(user_id)){
        return res.json({
            msg:"Invalid URL"
        })
    }else if(!Users[user_id]){
        return res.json({
            msg:"This User Does not Exist"
        })
    }else{
        delete Users[user_id]
        return res.json({
           msg:"User Removed Successfully"
        })
    }
})
app.put("/users/:user_id",(req,res)=>{
    const user_id = Number(req.params["user_id"]);
    const user_data = req.body;
    if(isNaN(user_id)){
        return res.json({
            msg:"Invalid URL"
        })
    }else if(!Users[user_id]){
        return res.json({
            msg:"This User Does not Exist"
        })
    }else{
        if(user_data["username"]){
            Users[user_id]["username"] = user_data["username"]
        }
        if(user_data["age"]){
            Users[user_id]["age"] = user_data["age"] 
        }
        return res.json({
            msg:"User Updated"
        })
    }
})
app.listen(PORT,()=>{
    console.log(`Server Running On http://localhost:${PORT}/`);
})