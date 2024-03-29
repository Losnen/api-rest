'use strict';

const Product = require('../models/product');

function getProduct (req,res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message:`Error al realizar la petición: ${err}` });
    if(!product) return res.status(404).send({ message: 'No existe el producto' });

    res.status(200).send({ product: product });
  });
}

function getProducts (req,res) {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message:`Error al realizar la petición: ${err}` });
    if(!products) return res.status(404).send({ message: 'No existe el producto' });

    res.status(200).send({ products });
  });
}

function saveProduct (req,res) {
  console.log('POST /api/product');
  console.log(req.body);

  let product = new Product()
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if(err) return res.status(500).send({ message:`Error al salvar en la base de datos: ${err}` });
  });
  res.status(200).send({ product: productStored});
}

function updateProduct (req,res) {
  let productId = req.params.productId;

  Product.findById(productId, (err) => {
    if(err) res.status(500).send({ message:`Error al realizar la petición: ${err}` });

    product.remove((err) => {
      if(err) res.status(500).send({ message:`Error al realizar la petición: ${err}` });
      res.status(200).send({ product: 'Prodcuto eliminado con éxito'});
    });
  });
}

function deleteProduct (req,res) {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err,productUpdated) => {
    if(err) res.status(500).send({ message:`Error al realizar la petición: ${err}` });

    res.status(200).send({ product: 'Prodcuto actualizado con éxito'});
  });
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
