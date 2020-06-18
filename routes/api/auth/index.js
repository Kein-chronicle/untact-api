const router = require('express').Router()
const controller = require('./auth.controller')

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

// 중복체크
router.post('/overlapChecker', controller.overlapChecker)

// 회원가입
router.post('/signup', upload.single('file'), controller.signUp)

// 로그인
router.post('/login', controller.login)

module.exports = router