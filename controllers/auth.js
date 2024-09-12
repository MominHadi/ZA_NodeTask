const User = require('../models/user');
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs');
const user = require('../models/user');

// Using Bcrypt-js to encrpt and decrypt user password

exports.createUser = (req, res, next) => {

    const { email, name, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg })
    }

    User.findOne({ email: email }).then(userData => {
        if (userData) {
            return res.status(409).json({ message: 'Duplicate User Found' })
        }

        bcryptjs.hash(password, 12)
            .then(encryptedPass => {
                let user = new User({
                    name: name,
                    email: email,
                    password: encryptedPass
                })
                return user.save()
            }

            )

    }).then(result => {
        res.status(201).json({ message: 'User Created Successfully' })

    }).catch(err => {
        console.log(err, 'Error During User Registration')
    })
}

//Login User API

exports.authenticateUser = (req, res, next) => {
    const { email, password } = req.body;

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ 'error': errors.array()[0].msg })
    }

    user.findOne({ email: email })
        .then((user) => {

            if (!user) {
                return res.status(404).json({ message: 'User Not Found' })
            }

            bcryptjs.compare(password, user.password)
                .then(isMatched => {

                    if (isMatched) {
                        console.log(isMatched)

                        res.status(200).json({
                            message: 'Authentication Successfull', user: {
                                _id: user._id.toString(),
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                    return res.status(422).json({ message: 'Invalid Email or password' })

                }).catch(err => {
                    return res.status(500).json({ message: 'Error logging in' })
                })
        })

}

