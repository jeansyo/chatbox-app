const { validateToken } = require("./validateToken");
const { isValidEmail, isValidName, isDuplicatedEmail, isDuplicatedName } = require("./validAuth");
const { validResults } = require("./validResults");

module.exports = {
    isValidName,
    isValidEmail,
    validResults,
    isDuplicatedName,
    isDuplicatedEmail,
    validateToken    
}