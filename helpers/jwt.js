const jwt = require("jsonwebtoken");

const generateJWT = ({ _id, name }) => {

    return new Promise( (resolve, reject) => {
        const payload = { _id, name };
        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '2h',
        }, (err, token) => {
            if( err ){
                console.log(err);
                reject("The token could not be generated")
            }else {
                resolve( token );
            }
        })
    } )

}

const verifyJWT = ( token ) => {

    return jwt.verify(token, process.env.PRIVATE_KEY);
    
}

module.exports = {
    generateJWT,
    verifyJWT
}