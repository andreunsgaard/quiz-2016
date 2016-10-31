// GET /quizes/question
var models = require('../models/models.js');
exports.question = function(req, res) {
	models.Quiz.findAll().then(function(quiz) {
		res.render('quizes/question', {
			pregunta: quiz[0].pregunta
		})
	})

};
//GET /quizes/answer
exports.answer = function(req, res, next) {
	models.Quiz.findAll().then(function(quiz) {
		if (req.query.respuesta === quiz[0].respuesta) {
			quiz[0].aciertos=quiz[0].aciertos+1;
			quiz[0].save().then(function(){	
				res.render('quizes/answer', {
				respuesta: 'Correcto'
				});
			});
		} else {
				
			res.render('quizes/answer', {
				respuesta: 'Uups has fallado,' + ' ha acertado ' +quiz[0].aciertos
			});
		quiz[0].aciertos=0;
		quiz[0].save();
		}
	})
};