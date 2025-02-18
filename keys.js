if (process.env.NODE_ENV === "production") {
    module.exports = {
        // mongoURI: process.env.MONGO_URI,
        // secretOrKey: process.env.SECRET_OR_KEY
        mongoURI: global.data.mongodb.url,
        secretOrKey: global.data.mongodb.secretOrKey
    };
} else {
    module.exports = {
        mongoURI: global.data.mongodb.url,
        secretOrKey: global.data.mongodb.secretOrKey
    };
}
