const { validationResult } = require("express-validator");

const validResults = (req, res, next) => {
    const errs = validationResult(req);
    if( !errs.isEmpty() ){
        return res.status( 400 ).json({
            ok: false,
            errs: errs.mapped()
        })
    }

    next(); 
}

module.exports = { 
    validResults
}