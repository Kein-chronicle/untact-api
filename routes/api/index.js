const authMiddleware = require('../../middlewares/auth')
const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')
const meeting = require('./meeting')
const book = require('./book')

router.use('/auth', auth)

router.use('/user', authMiddleware)
router.use('/user', user)

router.use('/meeting', meeting)

router.use('/book', book)

module.exports = router