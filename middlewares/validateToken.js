const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status( 401 ).json({
            ok: false,
            msg: "Token not found"
        })
    }

    try {
        
        const { _id, name } = jwt.verify( token, process.env.PRIVATE_KEY );

        req.user = { _id, name };

    } catch (err) {
        // console.log("error token verify")
        // console.log(err)
        return res.status( 500 ).json({
            ok:false,
            msg: "jwt malformed"
        })
    }

    next()

}

module.exports = {validateToken}