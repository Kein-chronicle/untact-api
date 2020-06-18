const authMiddleware = require('../../../middlewares/auth')
const router = require('express').Router()
const controller = require('./book.controller')

// router.post('/register', controller.register)

module.exports = router

// 방문
// 리스트(유저입장)
// 리스트(미팅생성자입장)
// 정보
// 남기기