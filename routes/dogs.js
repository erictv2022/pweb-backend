var express = require('express');
const request = require('request')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    const fetchDogBreeds = (url) => new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) reject(new Error('invalid API call'))
            resolve(body)
        })
    })

    fetchDogBreeds('https://dog.ceo/api/breeds/list/all').then(data => res.send(data))
})

module.exports = router;