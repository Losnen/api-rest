'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../../services');

function signUp(req,res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName
  });

  user.save((err) => {
    if(err) return res.status(500).send({ message:`Error al realizar la petición: ${err}` });

    return res.status(200).send({ token: service.createToken(user) });
   });

}

function signIn(req,res) {
  User.find({email: req.body.email}, (err, user) => {
    if(err) return res.status(500).send({ message:`Error al realizar la petición: ${err}` });

    if(!user) return res.status(404).send({ message:`No existe el usuario` });

    req.user = user;
    return res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    });
  });
}

module.exports = {
  signUp,
  signIn
}
