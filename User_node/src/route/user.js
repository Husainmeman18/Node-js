const Router = require("express").Router;
const user = require("../controller/user");
const {requireAuth} = require("../middleware/Auth")
const routes = Router();

routes.get("/:User_id", user.getOne) 
routes.get("/", requireAuth ,user.getAll)               
routes.post("/", user.createOne)      
routes.post("/login", user.Login)
routes.post("/sendOTP", user.sendOTP);        
routes.put("/:User_id", user.updateOne)       
routes.delete("/:User_id", user.deleteOne);   
module.exports = routes;
