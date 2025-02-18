const mongoose = require('mongoose');
console.log("Connecting To DB");
return mongoose.connect(
    global.data.mongodb.url,
    { useNewUrlParser: true, useUnifiedTopology: true }
);