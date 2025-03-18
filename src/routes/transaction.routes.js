const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// Simpler approach without bind
router.post('/send-sol', transactionController.sendSol);

module.exports = router; 