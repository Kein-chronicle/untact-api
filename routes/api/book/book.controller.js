const Meeting = require('../../../models/meeting')
const Book = require('../../../models/book')

exports.list = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const userId = req.decoded._id

    const dataSet = async (arr) => {
        var returnArr = []
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const meetingId = item.meetingId
            const meetingInfo = await Meeting.findOneByMeetingId(meetingId)
            if (!meetingInfo) {
                throw new Error("meeting info can not find")
            }
            const obj = {
                book : item,
                meeting: meetingInfo
            }
            returnArr.push(obj)
        }
        return returnArr
    }

    Book.findAllByUserId(userId)
    .then(dataSet)
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
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const userId = req.decoded._id
    const {bookId} = req.body

    const addMeetingInfo = async (book) => {
        if (!book || !book.meetingId) {
            throw new Error("can not find meeting info")
        }
        const meetingId = book.meetingId
        const meetingInfo = await Meeting.findOneByMeetingId(meetingId)
        if (!meetingInfo) {
            throw new Error("meeting info can not find")
        }
        const obj = {
            book : book,
            meeting: meetingInfo
        }
        return obj
    }

    Meeting.info(bookId, userId)
    then(addMeetingInfo)
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

exports.book = (req, res) => {
    const {infos} = req.body

    Book.book(infos)
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

// 남기기