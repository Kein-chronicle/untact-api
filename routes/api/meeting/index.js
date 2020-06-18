const authMiddleware = require('../../../middlewares/auth')
const router = require('express').Router()
const controller = require('./meeting.controller')

// 리스트
router.use('/list', authMiddleware)
router.get('/list', controller.list)

// 정보
router.post('/info', controller.info)

// 방문자 정보
router.use('/bookList', authMiddleware)
router.post('/bookList', controller.bookList)

// 만들기
router.use('/create', authMiddleware)
router.post('/create', controller.create)

// 삭제
router.use('/delete', authMiddleware)
router.delete('/delete', controller.delete)

module.exports = router
