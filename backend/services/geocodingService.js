// Simple mock geocoding service
class GeocodingService {
  async getCoordinates(location) {
    try {
      // Generate random coordinates around Delhi/NCR area
      // In production, use Google Maps/OpenStreetMap API
      
      const baseLat = 28.6139; // Delhi latitude
      const baseLng = 77.2090; // Delhi longitude
      
      // Add some random variation (within ~2km radius)
      const lat = baseLat + (Math.random() * 0.02 - 0.01);
      const lng = baseLng + (Math.random() * 0.02 - 0.01);
      
      return { lat, lng };
      
    } catch (error) {
      console.error('Geocoding error:', error);
      // Return default coordinates
      return { lat: 28.6139, lng: 77.2090 };
    }
  }
}

module.exports = new GeocodingService();