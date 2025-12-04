const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Debug: Check if env variables are loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'NOT LOADED');
console.log('PORT:', process.env.PORT);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
  console.log('Please check your .env file');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      console.log('Database:', mongoose.connection.db.databaseName);
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('Connection string used:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password
    });
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'SafePaws API is running',
    mongodb_connected: mongoose.connection.readyState === 1,
    database: mongoose.connection.db?.databaseName || 'Not connected'
  });
});


// Import and use report routes
const reportRoutes = require('./routes/reportRoutes');
app.use('/api', reportRoutes);
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});