const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,path.join(__dirname,"..","..","public","images"))
    },
    filename: function (req,file,cb) {
        cb(null ,Date.now() + "-" + file.originalname)
    }
});

const upload = multer({storage:Storage});

module.exports = upload;