const express = require('express');
const router = express.Router();

/*GET and POST path on /ps3 path */
router.route('/')
    .get(((req, res, next) => {

       //log to me that the get went through, but also status code 200 means the same
       console.log('successful get') ;

       //render using psIndex.pug and pass a fixed title string
       res.render('psIndex', {title: "it works!"});
    }))
    .post ((((req, res, next) => {
        // render using stringDetails.pug and pass the string from the form(body) and calculate its length
        res.render('stringDetails', {string: req.body.string, length: req.body.string.length} );
    })))

/*GET path on /ps3/names/{some_name} */
router.get('/names/:name', (req, res, next) => {
    //render using stringDetails and pass the string from the url query(params)
    res.render('stringDetails', {string: req.params.name});
})

// DONT FORGET TO EXPORT THE ROUTER
module.exports = router;
