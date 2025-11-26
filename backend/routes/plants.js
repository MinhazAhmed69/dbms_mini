const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.post('/', plantController.addPlant);
router.get('/', plantController.listPlants);
router.get('/:id', plantController.getPlantDetails);
router.put('/:id', plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);

module.exports = router;