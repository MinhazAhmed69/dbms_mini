const express = require('express');
const router = express.Router();
const growthController = require('../controllers/growthController');

router.post('/:id/growth', growthController.addGrowth);
router.get('/:id/history', growthController.getGrowth);

module.exports = router;