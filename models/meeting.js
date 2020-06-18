// mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Meeting = new Schema({
    _at : { type: Date, require: true },
    makerId : {type: String, require: true},
    title: {type: String, require: true},
    des: {type: String, require: true},
    address: {type: String, require: true},
    needInfo: {
        name: {ko: {type: String, require: true}, need: {type: Boolean, require: true}},
        tel: {ko: {type: String, require: true}, need: {type: Boolean, require: true}},
        address: {ko: {type: String, require: true}, need: {type: Boolean, require: true}},
        birth: {ko: {type: String, require: true}, need: {type: Boolean, require: true}},
        gender: {ko: {type: String, require: true}, need: {type: Boolean, require: true}},
        picture: {ko: {type: String, require: true}, need: {type: Boolean, require: true}}
    },
    bookCnt: {type: Number, require: true},
    deleted: {type: Boolean, require: true},
    rebook: {type: Boolean, require: true}
})

Meeting.statics.findAll = function (makerId) {
    return this.find({makerId})
}

Meeting.statics.findOneByMeetingId = function (_id) {
    return this.findOne({_id})
}

Meeting.statics.create = function (infos) {
    const meeting = new this(infos)
    return meeting.save()
}

Meeting.statics.delete = async function (_id, makerId) {
    return await this.updateOne({_id, makerId}, {deleted: true}, {upsert:true})
}

Meeting.statics.checkOwner = function (_id, makerId) {
    return this.findOne({_id, makerId})
}


module.exports = mongoose.model('Meeting', Meeting)