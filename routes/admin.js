var express = require('express');
var router = express.Router();
const AdminController =require('../Controllers/AdminController')
/* GET users listing. */

router.get('/',AdminController.adminLoginGet)
router.post('/adminLogin',AdminController.adminLoginPost)
// router.get('/about',AdminController.abott)
module.exports = router;
