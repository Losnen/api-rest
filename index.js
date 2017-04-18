'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
  res.send(200,{ products: []});
});

app.post('/api/product', (req, res) => {
  console.log('POST /api/product');
  console.log(req.body);

  let product = new Product()
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if(err) res.status(500).send({ message:`Error al salvar en la base de datos: ${err}` });
  });
  res.status(200).send({ product: productStored});

});

app.put('/api/product/:productId', (req, res) => {

});

app.delete('/api/product/:productId', (req, res) => {

});

mongoose.connect('mongodb://localhost/shop', (err, res) => {
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`);
  }
  console.log('Conexión establecida con la base de datos...');
  app.listen(port, () => {
    console.log(`Servidor corriendo en localhost:${port}`)
  });
});