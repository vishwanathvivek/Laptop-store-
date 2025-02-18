const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Product = require("../model/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const {  } = require("../validations");

router.get('/', (req, res) => {
    return res.status(200).send("Product API Working");
});

router.get("/all", (req, res) => {
    Product.find()
        .then((products) => {
            return res.status(200).send(JSON.stringify(products));
        })
        .catch((err) =>
            res.status(404).json({
                nopostsfound: "Error",
            })
        );
});

module.exports = router;