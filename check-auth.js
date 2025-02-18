const jwt = require('jsonwebtoken');

function verifyLogin(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json('Please Login first');
    }

    console.log("token", token)
    const t = token.split(" ")[1]

    jwt.verify(t, process.env.SECRET_KEY || global.data.mongodb.secretOrKey, (err, decoded) => {
        if (err) {
            return res.status(401).json('Token is not valid. Please re-login.');
        }

        req.user = decoded; // Set the decoded user object on the request
        console.log("decoded", decoded);
        next();
    });
}

module.exports = verifyLogin;
