'use strict'

const express = require('express');
const api = express.Router();

const userCtrl = require('../app/controllers/auth')
const auth = require('../middlewares/auth')
const ProductCtrl = require('../app/controllers/product')

api.get('/product', auth, ProductCtrl.getProducts);
api.get('/product:productId', auth, ProductCtrl.getProduct);
api.post('/product/:productId', auth, ProductCtrl.saveProduct);
api.put('/product/:productId', auth, ProductCtrl.updateProduct);
api.delete('/product/:productId', auth, ProductCtrl.deleteProduct);
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso'});
});

module.exports = api;
