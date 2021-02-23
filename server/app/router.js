const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');

const characterController = require('./controllers/characterController');
const loginController = require('./controllers/loginController');
const schoolController = require('./controllers/schoolController');
const spellController = require('./controllers/spellController');
//const userController = require('./controllers/userController');
//const adminController = require('./controllers/adminController');


const router = express.Router();

// home Page
router.get('/', mainController.homePage);
// Contact Page
router.get('/', mainController.contact);
// only one character by his id
router.get('/character/:id', characterController.getCharacterById);
// characters list
router.get('/characters', characterController.getAllCharacters);
// signup Page
router.get('/signup', loginController.signup);
// only one school by his id
router.get('/school/:id', schoolController.getSchoolById);
// schools list
router.get('/schools', schoolController.getAllSchools);
// only one spell by his id
router.get('/spell/:id', spellController.getSpellById);
// spells list
router.get('/spells', spellController.getAllSpells);

module.exports = router;