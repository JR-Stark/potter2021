const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');

const characterController = require('./controllers/characterController');

//const categoryController = require('./controllers/categoryController');

//const userController = require('./controllers/userController');
//const adminController = require('./controllers/adminController');


const router = express.Router();

// home Page
router.get('/', mainController.homePage);

// only one character by his id
router.get('/character/:id', characterController.getCharacterById);
// characters list
router.get('/characters', characterController.getAllCharacters);



module.exports = router;