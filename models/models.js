var path = require('path');
//cargar modelo ORM
var Sequelize = require('sequelize');
//usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: "quiz.sqlite"
});
//importar la definicion de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //exportar definicion de tabla Quiz
//sequelize.sync() cre e inicaliza tabña de eguntas en DB
sequelize.sync().then(function() {
	//success(..) ejecuta el manejador una vez ceada la tabla
	Quiz.count().then(function(count) {
		if (count === 0) { // la tabla se inicializa solo si esta vacia
			Quiz.create({
					pregunta: 'Capital de Italia',
					respuesta: 'Roma',
					aciertos: 0
				})
				.then(function() {
					console.log('base de datos inicalizada')
				})
		};
	});
});