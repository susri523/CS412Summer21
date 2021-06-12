const express = require('express');
const router = express.Router();

// npm installed
const fetch = require('node-fetch');
const request = require('request');

// ticketmaster key stored in config page so import from there
const config = require('../tsconfig.json');
const key = config.key;

// url is same for all 3 calls so just make it a const gotten from config file
const url = new URL(config.endpoint);

/* ******************************************************************************************************************* */

//  Route for form view
router.get('/', (req, res, next) => {
    res.render('form');
})

/* ******************************************************************************************************************* */

/*
    PATH 1 HELPER FUNC: function that returns a promise and takes the city as the input
    to make the call to node-fetch with the proper parameters
 */
const doPromise = function(city) {
    return new Promise (function(resolve, reject) {

        //parameters of the event search, all hardcoded except the city from the form
        let params = config.params;
        params.city = city;

        // tag the search params to the url
        url.search = new URLSearchParams(params).toString();

        // use fetch to make the call, pass in requestOpts for GET from config
        // NOTE: the body has the data here
        fetch(url, config.requestOptions)
            .then(body => {
                // resolve is the cb so pass the body as a json to the function in then
                resolve(body.json());
            })
            .catch(error => console.log('error', error)); // catch errors
    })
}

/*
    PATH 1: handles the call using a promise and node-fetch to make the HTTP request
    input comes from the body of the form
 */
router.post('/promise', (req, res, next) => {

    // call the function doPromise passing in the city and returning a promise
    doPromise(req.body.city)

        // use this function as the callback on the body that returns from fetch
        .then(function (body) {
            // render the page with all the values and body returns json so parse for the event list
            if (body.page.totalElements === 0){
                res.render('ps4', {msg: "Callback",city: req.body.city, noEvents: "True"});
            } else {
                res.render('ps4', {msg: "Promise",city: req.body.city, events: body._embedded.events});
            }


        // if it fails use this to catch the error and render the error page
        }).catch(function (err) {
            res.render('error', {error: err});
        })
})

/* ******************************************************************************************************************* */

/*
    PATH 2 HELPER FUNC: function that makes the call with node-fetch
    and takes the city as the input using await
 */
const doAsync = async (city) => {

    //parameters of the event search, all hardcoded except the city from the form
    let params = config.params;
    params.city = city;

    // tag the search params to the url
    url.search = new URLSearchParams(params).toString();

    // await fetch to make the call and then await to parse and return the parse.
    const body = await fetch(url, config.requestOptions);
    return await body.json();

    // .catch(error => console.log('error', error)); // catch errors
}

/*
    PATH 2: handles the call using async/await and node-fetch to make the HTTP request
    input comes from the body of the form
 */
router.post('/async', (req, res, next) => {

    //tell inner await to run first and then use () to run the function
    (async function(){
       // use await to do the request and pass in the query
       const body = await doAsync(req.body.city);

       // try to render the page to display the events
       try {
           if (body.page.totalElements === 0){
               res.render('ps4', {msg: "Async",city: req.body.city, noEvents: "We found no events :("});
           } else {
               res.render('ps4', {msg: "Async", city: req.body.city, events: body._embedded.events});
           }
       }
       // if not render the error page
       catch(err){
           res.render('error', {error: err});
       }
    })() // very very important to have the ()()

})

/* ******************************************************************************************************************* */

/*
    PATH 3 HELPER FUNC: takes the query input from the form and a callback to work on
    all the parameters are passed in as qs and request is called
 */
const doCallback = function(city, cb){

    // options include method, url, and params
    const options = {
        'method': 'GET',
        'url': url,
        'qs': {'apikey':key, classificationName: "music", countryCode:"US", city:city, page:"1", size:"5" },
    };

    // make the request with the options and callback func with error and response, catch error
    request(options, function (error, response) {

        if (error) throw new Error(error);
        //if not then parse the body of the response from string to JSON and run the cb
        cb(JSON.parse(response.body));
    });

}

/*
    PATH 3: handles the call using a callback and request module to make the HTTP request
    input comes from the body of the form
 */
router.post('/callback', (req, res, next) => {

    // call the function passing in the query string and the callback with the json body response
    doCallback (req.body.city, function(body){

        // render the page with all the valuesbody returns json so parse for the event list
        try{
            if (body.page.totalElements === 0){
                res.render('ps4', {msg: "Callback",city: req.body.city, noEvents: "We found no events :("});
            } else{
                res.render('ps4', {msg: "Callback",city: req.body.city, events: body._embedded.events});
            }
        }

        // we threw error otherwise so catch and render onto the error page
        catch(err) {
            res.render('error', {error: err});
        }
    })

})


// MUST DO THIS OR YOU GET ERROR
module.exports = router;