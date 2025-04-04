var express = require("express");
var router = express.Router();
const fireAuth=require('./fireRoute')
const passAuth=require('./auth')


router.use('/',fireAuth)
router.use('/auth',passAuth)


module.exports = router;
