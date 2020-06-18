const User = require( '../../../models/user' )

exports.info = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }
    
    const _id = req.decoded._id

    User.info(_id)
    .then((data) => {
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

exports.update = (req, res) => {
    if (!req.decoded._id) {
        return res.status(403).json({
            message: 'token error'
        })
    }

    const _id = req.decoded._id
    var {target, info} = req.body

    if (target === "profile") {
        const file = req.file
        if (!file) {
            return res.status(403).json({
                message: 'file error'
            })
        }
        info = file.path
    }

    const updateInfo = async (_id, key, value) => {
        var update = {}
        update[key] = value
        return await User.updateOne({_id}, update, {upsert:true})
    }

    updateInfo(_id, target, info)
    .then((data) => {
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