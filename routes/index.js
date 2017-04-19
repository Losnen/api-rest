'use strict'

const express = require('express');
const api = express.Router();

const ProductCtrl = require('../app/controllers/product')

api.get('/product', ProductCtrl.getProducts);
api.get('/product:productId', ProductCtrl.getProduct);
api.post('/product/:productId', ProductCtrl.saveProduct);
api.put('/product/:productId', ProductCtrl.updateProduct);
api.delete('/product/:productId', ProductCtrl.deleteProduct);

module.exports = api;
