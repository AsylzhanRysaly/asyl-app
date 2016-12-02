var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();
var PORT = process.env.PORT || 3000;


var cars = [];
var carNextId = 1;
app.get('/', function(req, res){
  res.send('Қош келдіңіз!!! \n GET сұраныс жасау үшін /cars  немесе /cars/id;  POST жасау үшін /cars ; DELETE  жасау үшін /cars/id');
});



app.get('/cars', function(req, res) {
  var queryParams = req.query;
  var queryParamsN = req.params;
	var filteredCars = cars;

	if(queryParams.hasOwnProperty('m') && queryParams.m.length > 0){
		filteredCars = _.filter(filteredCars, function (car){
			return car.mark.toLowerCase().indexOf(queryParams.m.toLowerCase()) > -1;
		});
	}
	if(queryParamsN.hasOwnProperty('y') && queryParamsN.y.length > 0){
		filteredCars = _.filter(filteredCars, function (cars){
			return car.year.toLowerCase().indexOf(queryParamsN.y.toLowerCase()) > -1;
		});
	}
	if(queryParams.hasOwnProperty('f') && queryParams.f.length > 0){
		filteredCars = _.filter(filteredCars, function (car){
			return car.fuel.toLowerCase().indexOf(queryParams.f.toLowerCase()) > -1;
		});
	}
	if(queryParams.hasOwnProperty('v') && queryParams.v.length > 0){
		filteredCars = _.filter(filteredCars, function (car){
			return car.volume.toLowerCase().indexOf(queryParams.v.toLowerCase()) > -1;
		});
	}
	if(queryParams.hasOwnProperty('c') && queryParams.c.length > 0){
		filteredCars = _.filter(filteredCars, function (car){
			return car.country.toLowerCase().indexOf(queryParams.c.toLowerCase()) > -1;
		});
	}


	res.json(filteredCars);

});

app.get('/cars/:id', function(req, res) {
	var CarId = parseInt(req.params.id, 10);

	db.car.findById(carId).then(function (car) {
		if (!!car) {
			res.json(car.toJSON());
		} else {
			res.status(404).send();
		}
	}, function (e) {
		res.status(500).send();
	});
});

app.use(bodyParser.json());

// POST /cars

app.post('/cars', function(req, res){
  var body = _.pick(req.body, 'mark', 'year', 'fuel', 'volume', 'country');

  db.car.create(body).then(function (car) {
		res.json(car.toJSON());
	}, function (e) {
		res.status(400).json(e);
	});

  /*if(!_.isString(body.mark) || body.mark.trim().length === 0 || !_.isString(body.year) || body.year.trim().length === 0 || !_.isString(body.fuel) || body.fuel.trim().length === 0 || !_.isString(body.volume) || body.volume.trim().length === 0 || !_.isString(body.country) || body.country.trim().length === 0){
    return res.status(400).send();
  }

  body.mark = body.mark.trim();  
  body.year = body.year.trim();
  
   body.fuel = body.fuel.trim();
  body.volume = body.volume.trim();
  body.country = body.country.trim();
  body.id = carNextId++;


  cars.push(body);

  res.json(body);*/
});


app.delete('/cars/:id', function(req, res) {
  if(cars.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No car found');
  }

  cars.splice(req.params.id, 1);
  res.json(true);
 
});
/*
app.put('/cars/:id', function(req, res){
	var carId = parseInt(req.params.id, 10);
	var matchedCar = _.findWhere(cars, {id: CarId});
	var body = _.pick(req.body, 'mark', 'year', 'fuel', 'volume', 'country');
	var validAttributes = {};

	if(!matchedCar){
		return res.status(404).send();
	}


	if(body.hasOwnProperty('mark') && _.isString(body.mark) && body.mark.trim().length > 0){
		validAttributes.mark = body.mark;
	}else if(body.hasOwnProperty('mark')){
		return res.status(400).send();
	}
		if(body.hasOwnProperty('year') && _.isString(body.year) && body.year.trim().length > 0){
		validAttributes.year = body.year;
	}else if(body.hasOwnProperty('year')){
		return res.status(400).send();
	}
		if(body.hasOwnProperty('fuel') && _.isString(body.fuel) && body.fuel.trim().length > 0){
		validAttributes.fuel = body.fuel;
	}else if(body.hasOwnProperty('fuel')){
		return res.status(400).send();
	}
		if(body.hasOwnProperty('volume') && _.isString(body.volume) && body.volume.trim().length > 0){
		validAttributes.volume = body.volume;
	}else if(body.hasOwnProperty('volume')){
		return res.status(400).send();
	}
		if(body.hasOwnProperty('country') && _.isString(body.country) && body.country.trim().length > 0){
		validAttributes.country = body.country;
	}else if(body.hasOwnProperty('country')){
		return res.status(400).send();
	}

	matchedCar = _.extend(matchedCar, validAttributes);
	res.json(matchedCar);
});
*/

/*
app.listen(PORT, function(){
  console.log('Express listening on port ' + PORT + '!');
});
*/
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});

