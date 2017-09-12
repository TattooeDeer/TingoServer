'use strict'

const Beta = require('../models/beta')


function getBetas (req,res) {
	Beta.find({}, (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})	
		res.status(200).send({beta: beta})
})
}


function getBeta (req, res) {
	let betaId = req.params.betaId

	Beta.findById(betaId, (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})	
		res.status(200).send({beta: beta})
	})
}


function validarCasino (req,res)  {
	let betaId = req.params.betaId

	Beta.findById(betaId,  (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})
		if (beta.tinkets.casino[1].estado != 'valido') return res.status(500).send({message: 'No hay tinkets disponibles'})
		else beta.tinkets.casino[1].estado = 'usado'	
		res.status(200).send({message: 'El tinket con ID '+beta.tinkets.casino[1].id+' ha sido validado'}) 
		beta.save()

	})
}

function validarCine (req,res)  {
	let betaId = req.params.betaId

	Beta.findById(betaId,  (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})
		if (beta.tinkets.cine[1].estado != 'valido') return res.status(500).send({message: 'No hay tinkets disponibles'})
		else beta.tinkets.cine[1].estado = 'usado'	
		res.status(200).send({message: 'El tinket con ID '+beta.tinkets.cine[1].id+' ha sido validado'}) 
		beta.save()

	})
}

module.exports = {
    getBetas,
	getBeta,
   	validarCasino,
	validarCine
}
