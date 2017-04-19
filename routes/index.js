'use strict'

const express = require('express');
const api = express.Router();

const auth = require('../middlewares/auth')
const ProductCtrl = require('../app/controllers/product')

api.get('/product', ProductCtrl.getProducts);
api.get('/product:productId', ProductCtrl.getProduct);
api.post('/product/:productId', ProductCtrl.saveProduct);
api.put('/product/:productId', ProductCtrl.updateProduct);
api.delete('/product/:productId', ProductCtrl.deleteProduct);
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso'});
});

module.exports = api;
