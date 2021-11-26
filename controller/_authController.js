const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/jwt");

const _authLoginController = async(req, res) => {

    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        
        const matchPassword = bcrypt.compareSync(password, userDB.password);
        if( !matchPassword ){
            return res.status( 400 ).json({
                ok: false, 
                msg: "Invalid password"
            })
        }

        const { _id, name } = userDB;

        const token = await generateJWT( { _id, name } );

        res.status(200).json({
            ok: true,
            user: {
                token,
                _id,
                name
            }
        })

    } catch (err) {
        console.log("Error login controller")
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Server error"
        })
    }
}

const _authRegisterController = async(req, res) => {
    
    const { password } = req.body;

    try {

        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync( password, salt );
        
        const userDB = new User( req.body );
        userDB.password = hashPassword;

        const { _id, name } = userDB;
        
        const [ token ] = await Promise.all([
            generateJWT({ _id: _id.toString(), name }),
            userDB.save()
        ])

        res.status( 201 ).json({
            ok: true,
            user: {
                token,
                _id: _id.toString(),
                name
            }
        })
        
    } catch (err) {
        console.log("Error register controllerr");
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Server Error"
        })
    }
}


const _authRenewController = async(req, res) => {

    const { _id, name } = req.user

    const token = await generateJWT( { _id, name } );

    res.status( 200 ).json({
        ok: true,
        token,
        _id, name
    })
}

module.exports = {
    _authLoginController,
    _authRegisterController,
    _authRenewController
}