const mongoose = require("mongoose");
const config = require("./config.helper")

const connString = `${config.DB_URI}`;
mongoose.connect(connString, { 
    useNewURLParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', function(){console.log(`Error Connecting to Mongo Db`)});
db.once('open', function(){console.log(`Connected to Mongo Db`)});
