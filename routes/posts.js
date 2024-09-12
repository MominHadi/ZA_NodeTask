const Router = require('express').Router()
const authController = require('../controllers/auth');
const { body } = require('express-validator');


Router.post('/register', [
    body('name', 'Enter Valid Name').trim().isLength({ min: 5 }),
    body('email', 'Enter Valid Email Address').isEmail(),
    body('password', 'Password Should be atleast of 6 characters').isString().isLength({ min: 6 }),
]
, authController.createUser);


module.exports = Router;
