const express = require('express');
const fetch = require('node-fetch');
const request = require('request');

const router = express.Router();

const config = require('../tsconfig.json');
const key = config.key;

const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json')

router.get('/', (req, res, next) => {
    res.render('form');
})

/*
    function that returns a promise and takes the city as the input
    to make the call to node-fetch with the proper parameters
 */
const doPromise = function(city) {
    return new Promise (function(resolve, reject) {
        // GET call to Ticketmaster API
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        //parameters of the event search, all hardcoded except the city from the form
        const params = {apikey:key, classificationName: "music", countryCode:"US", city:city, page:"1", size:"5",  } // or:

        // tag the search params to the url
        url.search = new URLSearchParams(params).toString();

        // use fetch to make the call and the body has the data here
        fetch(url, requestOptions)
            .then(body => {
                // resolve is the cb so pass the body as a json to the function in the then
                resolve(body.json());
            })
            .catch(error => console.log('error', error)); // catch errors
    })
}


/*
    handles the call using a promise and node-fetch to make the HTTP request
    input comes from the body of the form
 */
router.post('/promise', (req, res, next) => {

    // call the function doPromise passing in the city and returning a promise
    doPromise(req.body.city)

        // use this function as the callback on the body that returns from fetch
        .then(function (body) {
            // render the page with all the values
            // body returns json so parse for the event list
            res.render('ps4', {msg: "Promise",city: req.body.city, events: body._embedded.events});

        // if it fails use this to catch the error and render the error page
        }).catch(function (err) {
            res.render('error', {error: err});
        })
})



router.post('/async', (req, res, next) => {
        res.render('ps4', {msg:"Async", city: req.body.venue});
    }
)

const doCallback = function(cb){

}


router.post('/callback', (req, res, next) => {
        res.render('ps4', {msg:"Callback"});

    }
)





module.exports = router;