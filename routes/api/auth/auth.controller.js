const User = require( '../../../models/user' )
const config = require('../../../config')
const jwt = require('jsonwebtoken')

exports.overlapChecker = (req, res) => {
    const {id} = req.body

    User.findByUserId(id)
    .then((data) => {
        res.json({
            canUse: data === null
        })
    })
    .catch((err) => {
        res.status(403).json({
            message: err.message
        })
    })
}

exports.signUp = (req, res) => {
    const {
        id,
        pass,
        name,
        tel,
        address,
        birth,
        gender
    } = req.body

    const file = req.file

    const makeUser = (data) => {
        if (data) {
            throw new Error("overlap user")
        }
        const password = crypto.createHmac('sha1', config.secret)
                      .update(pass)
                      .digest('base64')
        var obj = {
            id,
            password,
            name,
            tel,
            address,
            birth,
            gender
        }
        if (file) {
            obj["profile"] = file.path
        }
        return obj
    }

    const createUser = async (user) => {
        return await User.signUp(user)
    }

    const makeToken = async (user) => {
        const p = new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id,
                    name: user.name
                }, 
                secret, 
                {
                    expiresIn: '7d',
                    issuer: 'keinchronicle',
                    subject: 'userInfo'
                }, (err, token) => {
                    if (err) reject(err)
                    resolve(token) 
                })
        })
        return p
    }

    const testOutput = (info) => {
        res.json({
            info
        })
    }

    User.findByUserId(id)
    .then(makeUser)
    .then(createUser)
    .then(testOutput)
    // .then(makeToken)
    // .then((token)=>{
    //     res.json({
    //         token
    //     })
    // })
    .catch((err)=>{
        res.status(403).json({
            message: err.message
        })
    })
}

exports.login = (req, res) => {
    const {id, password} = req.body

    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            name: user.name
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'keinchronicle',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findByUserId(id)
    .then(check)
    .then(respond)
    .catch(onError)
}