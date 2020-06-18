const router = require('express').Router()
const controller = require('./user.controller')

var multer = require('multer')
const path = require("path");
let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
})
let upload = multer({storage: storage})

// 정보호출
router.get('/info', controller.info)
// 정보수정
router.post('/update', upload.single('file'), controller.update)

module.exports = router

