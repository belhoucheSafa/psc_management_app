const express = require('express');
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/login', teamController.teamLogin);

// Protected routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// Team creation (only for authenticated users)
router.post('/', teamController.createTeam);

// Get team details
router.get('/:id', teamController.getTeam);

router.patch('/:id/reports', teamController.updateReports);

module.exports = router; 