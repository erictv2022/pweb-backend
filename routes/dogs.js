var express = require('express');
const request = require('request')
var router = express.Router();

/* GET users listing. */
router.get('/dogs', function (req, res, next) {
    const getData = () => new Promise((resolve, reject) => {
        const url = 'https://dog.ceo/api/breeds/list/all'
        request(url, (err, res, body) => {
            if (err) reject(new Error('invalid API call'))
            resolve(body)
        })
    })
    getData.then(res.send)
});

module.exports = router;