const express = require('express');
const router = express.Router();
const {
  createReport,
  getReports,
  getReportById
} = require('../controllers/reportController');

// Route definitions
router.post('/reports', createReport);    // Create report
router.get('/reports', getReports);       // Get all reports
router.get('/reports/:id', getReportById); // Get single report

module.exports = router;