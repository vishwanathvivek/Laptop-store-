const Product = require("./model/Product");

Product.deleteMany({}).then(() => {
    // The collection is empty, insert your items here
    const itemsToInsert = global.data.mongodb.collections.products.items;

    Product.insertMany(itemsToInsert).then((v) => {
        console.log('Items reset successfully.');
    }).catch(insertErr => {
        console.error('Error resetting products:', insertErr);
    });
}).catch(err => {
    if (err) {
        console.error('Error deleting products:', err);
    }
});