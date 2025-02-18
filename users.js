const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signupValidation, loginValidation } = require("../validations");

router.get('/', (req, res) => {
    return res.status(200).send("User API Working");
});

/**
 * Signup API
 */
router.post("/signup", async (req, res) => {
    // 1. Validation - name, email and password format check.
    const { error } = signupValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // 2. Duplicate user check
    const isUserEmailExist = await User.findOne({ email: req.body.email });
    if (isUserEmailExist) {
        return res.status(400).send("A User with the email already exists");
    }

    // 3. Encrypt Password. (We should not store password directly as per the law)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    // 4. Store the User details in DB
    try {
        await user.save();
        return res.status(200).send({ user: user._id });
    } catch (error) {
        return res.status(400).send(error);
    }
});


/**
 * Login API
 */
router.post("/login", async (req, res) => {
    // 1. Validation - email and password format check.
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // 2. User does not exists in db - check
    const isUserExist = await User.findOne({ email: req.body.email });
    if (!isUserExist) {
        return res.status(400).send("user does not exist");
    }

    // 3. Check password 
    const validPass = await bcrypt.compare(
        req.body.password,
        isUserExist.password
    );
    if (!validPass) {
        return res.status(400).send("email or password wrong");
    }

    // 4. create token
    const token = jwt.sign(req.body.email, process.env.SECRET_KEY || global.data.mongodb.secretOrKey);
    res.header("auth-token", token).send({ token, user: isUserExist });
});

/**
 * Logout API
 */
router.post("/logout", (req, res) => {
    res.clearCookie('jwt'); // If using cookies to store the token
    res.json('Logged out successfully');
});
module.exports = router;
