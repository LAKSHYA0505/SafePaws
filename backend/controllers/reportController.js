const Report = require('../models/Report');

// Create new report
const createReport = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    const { location, description, dogCount, urgency, imageUrl } = req.body;

    // Basic validation
    if (!location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Location and description are required'
      });
    }

    // Create report
    const report = new Report({
      location: location.trim(),
      description: description.trim(),
      dogCount: dogCount || 1,
      urgency: urgency || 'medium',
      imageUrl: imageUrl || '',
      status: 'reported'
    });

    console.log('Saving report:', report);

    // Save to database
    const savedReport = await report.save();
    
    console.log('Report saved:', savedReport._id);

    // Success response
    return res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: savedReport,
      reportId: savedReport._id
    });

  } catch (error) {
    console.error('❌ Error creating report:', error.message);
    console.error('Full error:', error);
    
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to create report',
      error: error.message
    });
  }
};

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
    
  } catch (error) {
    console.error('❌ Error fetching reports:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message
    });
  }
};

// Get single report
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: report
    });
    
  } catch (error) {
    console.error('❌ Error fetching report:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch report',
      error: error.message
    });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById
};