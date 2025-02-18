module.exports = {
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/laptopdb',
        secretOrKey: "secret_key",
        dbName: 'laptopdb',
        collections: {
            users: {
                name: 'users'
            },
            cart: {
                name: 'cartitems'
            },
            order: {
                name: 'orders'
            },
            products: {
                name: 'products',
                items: [
                    {
                        productId: '1',
                        name: 'Dell Spx 13',
                        category: 'popular',
                        description: '',
                        price: '50,000',
                        rating: '4',
                        imagePath: 'images/products/sp2.jpg'
                    },
                    {
                        productId: '2',
                        name: 'Asus Laptop',
                        category: 'popular',
                        description: '',
                        price: '30,000',
                        rating: '4',
                        imagePath: 'images/products/sp2.jpg'
                    },
                    {
                        productId: '3',
                        name: 'Dell Spx 17',
                        category: 'popular',
                        description: '',
                        price: '50,000',
                        rating: '4',
                        imagePath: 'images/products/sp3.jpg'
                    },
                    {
                        productId: '4',
                        name: 'HP 15S',
                        category: 'popular',
                        description: '',
                        price: '20,000',
                        rating: '4',
                        imagePath: 'images/products/sp4.jpg'
                    },
                    {
                        productId: '5',
                        name: 'Asus Thug',
                        category: 'popular',
                        description: '',
                        price: '1,55,500',
                        rating: '4',
                        imagePath: 'images/products/sp5.jpg'
                    },
                    {
                        productId: '6',
                        name: 'Asus Vivobook',
                        category: 'popular',
                        description: '',
                        price: '30,000',
                        rating: '4',
                        imagePath: 'images/products/sp6.jpg'
                    },
                    {
                        productId: '7',
                        name: 'Asus Zenbook',
                        category: 'popular',
                        description: '',
                        price: '70,000',
                        rating: '4',
                        imagePath: 'images/products/sp7.jpg'
                    },
                    {
                        productId: '8',
                        name: 'Apple Macbook 14',
                        category: 'popular',
                        description: '',
                        price: '80,000',
                        rating: '4',
                        imagePath: 'images/products/sp8.jpg'
                    },
                    {
                        productId: '9',
                        name: 'Macbook Air',
                        category: 'popular',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/sp9.jpg'
                    },
                    {
                        productId: '10',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '11',
                        name: 'Lenovo Yoga Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c2.jpg'
                    },
                    {
                        productId: '12',
                        name: 'Asus v157',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c3.jpg'
                    },
                    {
                        productId: '13',
                        name: 'Macbook 2lr',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c4.jpg'
                    },
                    {
                        productId: '14',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '15',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '16',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '17',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '18',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '19',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '20',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    },
                    {
                        productId: '21',
                        name: 'HP 360 Fold',
                        category: 'modern',
                        description: '',
                        price: '1,00,000',
                        rating: '4',
                        imagePath: 'images/products/c1.jpg'
                    }                    
                ]
            }
        }
    }
};