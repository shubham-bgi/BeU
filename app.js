// Design a schema for inventory management system.

// Suppose you have 10 products with specific quantities. You have to design an API which accepts productIds and add and remove the quantities from inventory upon a successful order.

// Sample API call

// POST

// [{productId:123,

// quantity:10,

// operation:”add”},

// {productId:143,

// quantity:14,

// operation:”add”},

// {productId:193,

// quantity:17,

// operation:”subtract”}]
// Minimum DB requests should be used ideally

 

// Create 2 files, one for schema and one for route


// tech should be only express and mongodb

const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const bodyParser = require('body-parser');

require('./model');
app.listen(PORT, () => {
    console.log(`Server started on : http://localhost:${PORT}`);
});
app.use(bodyParser.json());

app.post('/product', (req, res) => {
    routes.product.update(req, res);
})