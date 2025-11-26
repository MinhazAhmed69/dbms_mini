const express = require('express');
const router = express.Router();
const wateringController = require('../controllers/wateringController');

router.post('/:id/water', wateringController.logWater);
router.get('/:id/history', wateringController.getWateringHistory);

module.exports = router;