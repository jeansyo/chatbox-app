const { Router } = require("express");
const { check } = require("express-validator");
const { _authRegisterController, _authLoginController, _authRenewController } = require("../controller");
const { isValidEmail, validResults, isDuplicatedEmail, isDuplicatedName, validateToken } = require("../middlewares");

const router = Router();

router.post(
    '/login',
    [
        check( "email", "Invalid Email" ).isEmail(),
        check( "password", "Invalid password").isString().isLength({ min: "6", max: "30" }),
        validResults,
        isValidEmail,
    ],
    _authLoginController
)

router.post(
    '/register',
    [
        check( 'name', "Invalid name" ).isString().isLength({ min: 2, max: 30 }),
        check( "email", "Invalid email" ).isEmail(),
        check( "password", "Invalid password").isString().isLength({ min: "6", max: "30" }),
        validResults,
        isDuplicatedEmail,
        isDuplicatedName
    ],
    _authRegisterController
)

router.get(
    '/renew',
    [
        validateToken
    ],
    _authRenewController
)

module.exports = router