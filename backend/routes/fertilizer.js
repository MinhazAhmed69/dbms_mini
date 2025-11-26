const express = require('express');
const router = express.Router();
const fertController = require('../controllers/fertilizerController');

router.post('/:id/fertilize', fertController.logFertilizer);
router.get('/:id/history', fertController.getFertilizerHistory);

module.exports = router;