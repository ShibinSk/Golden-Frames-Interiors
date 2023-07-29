var express = require('express');
var router = express.Router();
const AdminController =require('../Controllers/AdminController')
/* GET users listing. */

router.get('/',AdminController.AddNew)
router.get('/about',AdminController.abott)
module.exports = router;
