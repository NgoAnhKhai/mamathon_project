var express = require("express");
const levelUpPet = require("../controllers/pet/LevelUpPet");
const addPet = require("../controllers/Pet/createPet");
const blobSubmitPet = require("../controllers/MarketPlace/blob/blobSubmitPet");
const getPet = require('../controllers/pet/getPet');// day ne
const postPetUp = require('../controllers/pet/postPetUp');// day ne
const validationMiddleware = require("../middlewares/validation.middleware"); // day ne 
const blobSubmitPetSchema = require("../controllers/src/MarketPlace/blob/blobSubmitPetVSchema"); // day ne
const addPetSchema = require("../controllers/src/pet/createPetVSchema");// day ne
const {levelUpPetSchemaParams, levelUpPetSchemaBody} = require("../controllers/src/pet/levelUpPetVSchema");// day ne
var router = express.Router();

/* GET users listing. */
router.post("/",validationMiddleware(addPetSchema, "body"),addPet);
router.post(
    "/submit-blob",
    validationMiddleware(blobSubmitPetSchema, "body"), // Sử dụng validationMiddleware
    blobSubmitPet
  );// day ne
router.get('/', getPet);// day ne
router.post('/up', postPetUp);// day ne
router.post('/levelUp', levelUpPet);// day ne
module.exports = router;
