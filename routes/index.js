'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const betaCtrl = require('../controllers/beta')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)


api.get('/beta', betaCtrl.getBetas)
api.get('/beta/:betaId', auth, betaCtrl.getBeta)
api.get('/beta/validarCasino/:betaId', auth, betaCtrl.validarCasino)
api.get('/beta/validarCine/:betaId', auth, betaCtrl.validarCine)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
