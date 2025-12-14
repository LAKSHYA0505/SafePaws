const express = require('express');
const router = express.Router();
const {
  createReport,
  getReports,
  getReportById,
  updateReportStatus
} = require('../controllers/reportController');

// Route definitions
router.post('/reports', createReport);          // Create report
router.get('/reports', getReports);             // Get all reports
router.get('/reports/:id', getReportById);      // Get single report
router.put('/reports/:id', updateReportStatus); // Update report status

module.exports = router;