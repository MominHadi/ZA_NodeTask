const User = require('../models/user');
const { validationResult } = require('express-validator')

exports.createUser = (req, res, next) => {

    const { email, name, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return   res.status(422).json({ message: errors.array()[0].msg })
    }


    User.findOne({ email: email }).then(userData => {
        if (userData) {
            return res.status(409).json({ message: 'Duplicate User Found' })
        }
        let user = new User({
            name: name,
            email: email,
            password: password
        })
        return user.save()

    }).then(result => {
        
        res.status(201).json({ message: 'User Created Successfully' })

    }).catch(err => {
        console.log(err, 'Error During User Registration')
    })
}