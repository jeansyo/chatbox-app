const { _authLoginController, _authRegisterController, _authRenewController } = require("./_authController");
const { _socketController } = require("./_socketController");

module.exports = {
    _socketController,
    _authLoginController,
    _authRegisterController,
    _authRenewController
}