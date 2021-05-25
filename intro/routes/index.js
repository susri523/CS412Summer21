const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const request = require('request');
const options = {
  'method': 'GET',
  'url': 'https://app.ticketmaster.com/discovery/v2/venues.json?apikey=PBSmqVGp0ZUUCVC3VKJ3oTH3SWnidD7S\n&countryCode=US&stateCode=MA&page=1&size=1',
};

router.get('/events', function(req, res, next) {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.render('index', { title: 'Express', result: response.body});
  });
});

module.exports = router;
