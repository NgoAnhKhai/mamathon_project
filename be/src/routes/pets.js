var express = require("express");
const levelUpPet = require("../controllers/Pet/LevelUpPet");
const addPet = require("../controllers/Pet/createPet");

var router = express.Router();

/* GET users listing. */
router.post("/", addPet);
router.post("/:petId", levelUpPet);

module.exports = router;
