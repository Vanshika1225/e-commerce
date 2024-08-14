const express = require("express");
const RegisterUser = require('../Controller/RegisterUser')

const router = express.Router();

router.route('/register').post(RegisterUser.RegisterUser);
router.route('/login').post(RegisterUser.LoginUser);
router.route('/logout').get(RegisterUser.Logout);

module.exports = router;