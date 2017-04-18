'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/hola/:name', (req,res) => {
  res.send({ message: `Hola ${req.params.name}` });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en localhost:${port}`)
});
