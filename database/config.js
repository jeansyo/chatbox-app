const mongoose = require("mongoose");

const config = async() => {
    try {
        
        await mongoose.connect( process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )
        
        console.log("Database Online")
        
    } catch (err) {
        console.log(err);
        throw new Error('Error initializing database');
    }
}

module.exports = config