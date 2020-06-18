// mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
    _at : { type: Date, require: true },
    auth : {type: Boolean, require: true},
    userId : {type: String, required: false},
    name: {type: String, required: false},
    address: {type: String, required: false},
    tel: {type: String, required: false},
    birth: {type: String, required: false},
    gender: {type: String, required: false},
    picture: {type: String, required: false},
    meetingId : {type: String, required: true}
})

Book.statics.findAllByMeeting = function (meetingId) {
    return this.find({meetingId})
}

Book.statics.findAllByUserId = function (userId) {
    return this.find({userId})
}

Book.statics.info = function (_id, userId) {
    return this.findOne({_id, userId})
}

Book.statics.book = function (infos) {
    const book = new this(infos)
    return book.save()
}

module.exports = mongoose.model('Book', Book)