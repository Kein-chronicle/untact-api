// mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    _at : { type: Date, require: true },
    id: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    tel: {type: String, require: true},
    address: {type: String, require: true},
    birth: {type: String, require: true},
    gender: {type: String, require: true},
    profile: {type: String, require: true}
})

// 중복체크용
User.statics.findByUserId = function (id) {
    return user.findOne({id})
}

// 회원가입
User.statics.signUp = function (infos) {
    const user = new this(infos)
    return user.save()
}

// 정보호출
User.statics.info = function (_id) {
    return this.findOne({_id})
}

module.exports = mongoose.model('User', User)