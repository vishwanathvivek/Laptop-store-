const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.get('/', (req, res) => {
    return res.status(200).send("Order API Working");
});

router.post("/all", (req, res) => {
    Order.find({ email: req.body.email })
        .then((items) => {
            return res.status(200).send(JSON.stringify(items));
        })
        .catch((err) =>
            res.status(404).json({
                nopostsfound: "Error",
            })
        );
});

router.post("/add", async (req, res) => {    
    let orderItem = new Order({
        email: req.body.email,
        date: req.body.date,
        status: "order placed",
        productId: req.body.productId,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        imagePath: req.body.imagePath,
        description: req.body.description,
        rating: req.body.rating
    });
    // console.log(req.body);
    console.log(orderItem);
    try {
        await orderItem.save();
        return res.status(200).send("Added to cart");
    } catch (error) {
        return res.status(400).send(error);
    }
});
module.exports = router;