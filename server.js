var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;


var cars = [];
app.get('/', function(req, res){
  res.send('Қош келдіңіз!!! \n GET сұраныс жасау үшін /cars  немесе /cars/id;  POST жасау үшін /cars ; DELETE  жасау үшін /cars/id');
});

app.get('/cars', function(req, res) {
  res.json(cars);
});

app.get('/cars/:id', function(req, res) {
  if(cars.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No cars found');
  }

  var c = cars[req.params.id];
  res.json(c);
});
app.use(bodyParser.json());

// POST /cars

app.post('/cars', function(req, res){
  var body = _.pick(req.body, 'mark', 'year', 'fuel', 'volume', 'country');

  if(!_.isString(body.mark) || body.mark.trim().length === 0 || !_.isString(body.year) || body.year.trim().length === 0 || !_.isString(body.fuel) || body.fuel.trim().length === 0 || !_.isString(body.volume) || body.volume.trim().length === 0 || !_.isString(body.country) || body.country.trim().length === 0){
    return res.status(400).send();
  }

  body.mark = body.mark.trim();  
  body.year = body.year.trim();
  
   body.fuel = body.fuel.trim();
  body.volume = body.volume.trim();
  body.country = body.country.trim();


  cars.push(body);

  res.json(body);
});


app.delete('/cars/:id', function(req, res) {
  if(cars.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No car found');
  }

  cars.splice(req.params.id, 1);
  res.json(true);
 
});

app.listen(PORT, function(){
  console.log('Express listening on port ' + PORT + '!');
});
