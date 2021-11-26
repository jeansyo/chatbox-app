const User = require("../models/user");

const isValidEmail = async(req, res, next) => {
    
    const { email } = req.body;

    try {

        const userDB = await User.findOne( { email } );
        if( !userDB ){
            return res.status( 404 ).json({
                ok: false,
                msg: "User not found"
            })
        }

    } catch (err) {
        console.log("valid error email middleasw")
        console.log(err);
    }
    next()
}

const isValidName = async(req, res) => {

    const { name } = req.body;

    try {

        const userDB = await User.findOne({name});
        if( !userDB ){
            return res.status( 400 ).json({
                ok: false,
                msg: "The name already exist"
            })
        }
        
    } catch (err) {
        console.log("valid error name middleas")
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
    next()
}

const isDuplicatedName = async(req, res, next) => {

    const { name } = req.body;

    try {
        
        const userDB = await User.findOne({ name });
        if( userDB ) {
            return res.status( 409 ).json({
                ok: false,
                msg: `The name: "${ name }" already exist`
            })
        }

    } catch (err) {
        console.log("Error duplicated name moiddlewat");
        res.status(500).json({
            ok: false,
            msg:"Server error"
        })
    }
    next()
}

const isDuplicatedEmail = async(req, res, next) => {
    
    const { email } = req.body;

    try {
        
        const userDB = await User.findOne({ email });
        if( userDB ) {
            return res.status( 409 ).json({
                ok: false,
                msg: `The email: "${ email }" already exist`
            })
        }

    } catch (err) {
        console.log("Error duplicated email middlewata")
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Server error"
        })
    }
    next()
}

module.exports= {
    isValidEmail,
    isValidName,
    isDuplicatedName,
    isDuplicatedEmail
}