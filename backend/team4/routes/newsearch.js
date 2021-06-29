var express = require('express')
var router = express.Router()
const query_find = require('../middleware/query_params');
const {findAlldata,insertdata,findDataBasedOnTitle,findDataBasedOnAuthor,findDataBasedOnLanguage,findDataBasedOnSearchItem} = require('../../team4/controllers/newsearch')

const Books = require('../model/search');

router.route('/')
.get(query_find(Books),findAlldata)
.post(insertdata)

router.route('/CommonSearch/:searchitem')
.get(findDataBasedOnSearchItem)

router.route('/Title/:title')
.get(findDataBasedOnTitle)

router.route('/Author/:author')
.get(findDataBasedOnAuthor)

router.route('/languages/:language')
.get(findDataBasedOnLanguage)

module.exports = router
