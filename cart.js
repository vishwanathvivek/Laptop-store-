const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const verifyLogin = require('../check-auth');

router.get('/', (req, res) => {
    return res.status(200).send("Cart API Working");
});

router.post("/all", verifyLogin, (req, res) => {
    console.log(req.body.email);
    Cart.find({ email: req.body.email })
        .then((items) => {
            console.log(items.length);
            return res.status(200).send(JSON.stringify(items));
        })
        .catch((err) =>
            res.status(404).json({
                nopostsfound: "Error",
            })
        );
});

router.post("/add", verifyLogin, async (req, res) => {    
    let cartItem = new Cart({
        email: req.body.email,
        productId: req.body.productId,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        imagePath: req.body.imagePath,
        description: req.body.description,
        rating: req.body.rating
    });
    // console.log(req.body);
    console.log(cartItem);
    try {
        await cartItem.save();
        return res.status(200).send("Added to cart");
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post("/remove", verifyLogin, (req, res) => {
    Cart.deleteMany({ email: req.body.email, productId: req.body.productId })
        .then(() => {
            return res.status(200).send("Removed from cart");
        })
        .catch((err) =>
            res.status(404).json({
                nopostsfound: "Error",
            })
        );
});

router.post("/clear", verifyLogin, (req, res) => {
    Cart.deleteMany({})
        .then(() => {
            return res.status(200).send("Removed from cart");
        })
        .catch((err) =>
            res.status(404).json({
                nopostsfound: "Error",
            })
        );
});

module.exports = router;