var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/dev-car-api.sqlite'
});
var db = {};

db.car = sequelize.import(__dirname + '/models/car.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
