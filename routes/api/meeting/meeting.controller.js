const Meeting = require('../../../models/meeting')
const Book = require('../../../models/book')

exports.list = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const userId = req.decoded._id

    Meeting.findAll(userId)
    .then((data)=>{
        res.json({
            data
        })
    })
    .catch((err)=>{
        res.status(403).json({
            message: err.message
        })
    })
}

exports.info = (req, res) => {
    const {_id} = req.body

    Meeting.findOneByMeetingId(_id)
    .then((data)=>{
        res.json({
            data
        })
    })
    .catch((err)=>{
        res.status(403).json({
            message: err.message
        })
    })

}

exports.bookList = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const userId = req.decoded._id
    const {meetingId} = req.body

    const findBook = async (data) => {
        if (!data) {
            throw new Error("is not yours")
        }

        return await Book.findAllByMeeting(meetingId)
    }

    Meeting.checkOwner(meetingId, userId)
    .then(findBook)
    .then((data)=>{
        res.json({
            data
        })
    })
    .catch((err)=>{
        res.status(403).json({
            message: err.message
        })
    })
}

exports.create = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const userId = req.decoded._id
    var {info} = req.body

    info["makerId"] = userId
    info["bookCnt"] = 0
    info["deleted"] = false

    Meeting.create(info)
    .then((data)=>{
        res.json({
            data
        })
    })
    .catch((err)=>{
        res.status(403).json({
            message: err.message
        })
    })
}

exports.delete = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const userId = req.decoded._id
    const {_id} = req.body

    Meeting.delete(_id, userId)
    .then((data)=>{
        res.json({
            data
        })
    })
    .catch((err)=>{
        res.status(403).json({
            message: err.message
        })
    })
}