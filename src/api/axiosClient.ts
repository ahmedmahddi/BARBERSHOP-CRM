import axios from 'axios';

// Create a base axios instance with common configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // For admin routes, add a temporary admin token
    // IMPORTANT: In a production environment, this should be handled properly with a secure authentication system
    // This is just a temporary solution for development purposes
    
    // Check if this is an admin route that requires authentication
    // Admin routes include:
    // 1. GET /bookings (list all bookings)
    // 2. PATCH /bookings/{id}/status (update booking status)
    // 3. PUT /bookings/{id} (update booking details)
    // 4. DELETE /bookings/{id} (delete booking)
    // But exclude POST /bookings (create new booking) which doesn't require auth
    const isAdminRoute = (
      // GET all bookings
      (config.url === '/bookings' && config.method === 'get') ||
      // Update booking status
      (config.url?.includes('/bookings/') && config.url?.includes('/status')) ||
      // Update or delete specific booking
      (config.url?.includes('/bookings/') && ['put', 'delete'].includes(config.method ?? ''))
    );
    
    if (isAdminRoute) {
      // Add a temporary admin token for development
      // In production, you should get this token from a secure authentication process
      config.headers['Authorization'] = 'Bearer ADMIN_TOKEN_FOR_DEVELOPMENT';
    }
    
    return config;
  },
  (error) => {
    // Ensure rejection reason is an Error object
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    const message = error.response?.data?.error ?? error.message ?? 'Unknown error occurred';
    console.error(`API Error: ${message}`);
    // Ensure rejection reason is an Error object with context
    const enhancedError = error instanceof Error ? error : new Error(String(error));
    return Promise.reject(enhancedError);
  }
);

export default api;
