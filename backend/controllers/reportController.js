const Report = require('../models/Report');
const geocodingService = require('../services/geocodingService');

// Create new report
const createReport = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    const { location, description, dogCount, urgency, imageUrl, imagePublicId } = req.body;

    // Get coordinates from location
    const coordinates = await geocodingService.getCoordinates(location);

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
      imagePublicId: imagePublicId || '',
      status: 'reported',
      coordinates: coordinates
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
    
    return res.status(500).json({
      success: false,
      message: 'Failed to create report',
      error: error.message
    });
  }
};

// Get all reports
// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    
    // Ensure all reports have at least mock coordinates
    const reportsWithCoordinates = reports.map(report => {
      if (!report.coordinates || !report.coordinates.lat) {
        // Generate coordinates based on location hash
        const hash = report.location.split('').reduce((acc, char) => {
          return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        
        const baseLat = 28.6139;
        const baseLng = 77.2090;
        
        return {
          ...report.toObject(),
          coordinates: {
            lat: baseLat + ((hash % 100) * 0.001),
            lng: baseLng + ((Math.abs(hash) % 100) * 0.001)
          }
        };
      }
      return report;
    });
    
    return res.status(200).json({
      success: true,
      count: reportsWithCoordinates.length,
      data: reportsWithCoordinates
    });
    
  } catch (error) {
    console.error('❌ Error fetching reports:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message
    });
  }
};;

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

// Update report status (for map)
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['reported', 'under_review', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required'
      });
    }
    
    const report = await Report.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Report status updated',
      data: report
    });
    
  } catch (error) {
    console.error('❌ Error updating report:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReportStatus
};