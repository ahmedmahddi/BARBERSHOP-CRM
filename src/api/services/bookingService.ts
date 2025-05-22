import api from '../axiosClient';

// Types matching backend DTOs
export interface BookingData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  comments?: string;
  imageUrl?: string;
  agreement: boolean;
  status?: 'confirmed' | 'pending' | 'cancelled';
  // Additional fields from API response
  barber_name?: string;
  service_name?: string;
  barber_id?: string;
  service_id?: string;
  image_url?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  barber: string;  // Will be mapped to barberId
  service: string; // Will be mapped to serviceId
  dateTime?: string; // Original combined date/time (optional now)
  date?: string;    // Explicit date in YYYY-MM-DD format
  time?: string;    // Explicit time in HH:MM format (24-hour)
  comments?: string;
  imageUrl?: string;
  agreement: boolean;
}

/**
 * Creates a new booking with optional image upload
 */
export const createBooking = async (
  formData: BookingFormData,
  imageFile?: File
): Promise<BookingData> => {
  // Create a FormData object for multipart/form-data (required for file upload)
  const data = new FormData();
  
  // Map frontend form data to backend DTO fields
  data.append('name', formData.name);
  data.append('email', formData.email);
  data.append('phone', formData.phone);
  data.append('barberId', formData.barber);
  data.append('serviceId', formData.service);
  
  // Extract and validate date and time
  const { date, time } = extractDateAndTime(formData);
  
  // Helper function to extract date and time from form data
  function extractDateAndTime(formData: BookingFormData): { date: string; time: string } {
    // Case 1: Explicit date and time fields provided
    if (formData.date && formData.time) {
      return {
        date: formData.date,
        time: formData.time
      };
    }
    
    // Case 2: Parse from dateTime field
    if (formData.dateTime) {
      return parseDateTimeString(formData.dateTime);
    }
    
    // No date/time information available
    throw new Error('Missing date and time information');
  }
  
  // Helper function to parse different datetime string formats
  function parseDateTimeString(dateTimeStr: string): { date: string; time: string } {
    // Format 1: ISO format "YYYY-MM-DDTHH:MM"
    if (dateTimeStr.includes('T')) {
      const [date, time] = dateTimeStr.split('T');
      return { date, time };
    }
    
    // Format 2: "Month d, yyyy - h:mm AM/PM"
    if (dateTimeStr.includes(' - ')) {
      const parts = dateTimeStr.split(' - ');
      const datePart = parts[0]; // e.g., "May 12, 2025"
      const timePart = parts[1]; // e.g., "10:00 AM"
      
      // Convert date to YYYY-MM-DD
      const dateObj = new Date(datePart);
      const date = dateObj.toISOString().split('T')[0];
      
      // Convert time to 24-hour format (HH:MM)
      const time = convertTo24HourFormat(timePart);
      return { date, time };
    }
    
    // Unknown format
    throw new Error('Invalid date/time format');
  }
  
  // Validate date format (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.exec(date)) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }
  
  // Validate time format (HH:MM)
  const timePattern = /^\d{2}:\d{2}$/;
  if (!timePattern.exec(time)) {
    throw new Error('Invalid time format. Expected HH:MM (24-hour format)');
  }
  
  data.append('date', date);
  data.append('time', time);
  
  // Helper function to convert "10:00 AM" to "10:00" or "2:00 PM" to "14:00"
  function convertTo24HourFormat(timeStr: string): string {
    const [timePart, modifier] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':');
    let hoursNum = parseInt(hours, 10);
    
    // Convert to 24-hour format
    if (modifier === 'PM' && hoursNum < 12) {
      hoursNum += 12;
    } else if (modifier === 'AM' && hoursNum === 12) {
      hoursNum = 0;
    }
    
    // Ensure two digits
    const formattedHours = hoursNum.toString().padStart(2, '0');
    return `${formattedHours}:${minutes}`;
  }
  
  // Optional fields
  if (formData.comments) {
    data.append('comments', formData.comments);
  }
  
  // Convert boolean to string for backend processing
  data.append('agreement', formData.agreement ? 'true' : 'false');
  
  // Add image file if provided
  if (imageFile) {
    console.log('Adding file to FormData:', imageFile.name, imageFile.type, imageFile.size);
    // Use 'image' as the field name - this can be any field name since we're using multer.any()
    data.append('image', imageFile);
    
    // Log the FormData contents for debugging
    console.log('FormData entries:');
    // Use Array.from to convert FormData entries to an array for iteration
    const entries = Array.from(data.entries());
    entries.forEach(entry => {
      console.log(entry[0], typeof entry[1] === 'object' ? 'File object' : entry[1]);
    });
  }
  
  try {
    const response = await api.post('/bookings', data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Override default JSON content type
      },
    });
    
    return response.data.data; // Assuming backend returns { data: BookingData }
  } catch (error: any) {
    // Handle specific error cases
    if (error.response?.data?.details) {
      // Format validation errors
      const validationErrors = error.response.data.details
        .map((detail: any) => `${detail.field}: ${detail.message}`)
        .join(', ');
      throw new Error(`Validation failed: ${validationErrors}`);
    }
    
    // Re-throw the error for the component to handle
    throw error;
  }
};

/**
 * Gets a booking by ID
 */
export const getBookingById = async (id: string): Promise<BookingData> => {
  const response = await api.get(`/bookings/${id}`);
  
  // Map backend fields to frontend fields
  const bookingData = response.data.data;
  
  // Log the response for debugging
  console.log('Backend booking data:', bookingData);
  
  // Map image_url to imageUrl (snake_case to camelCase)
  const mappedData: BookingData = {
    ...bookingData,
    barberId: bookingData.barber_id ?? bookingData.barberId,
    serviceId: bookingData.service_id ?? bookingData.serviceId,
    imageUrl: bookingData.image_url // Map the backend field to the frontend field
  };
  
  console.log('Mapped booking data:', mappedData);
  
  return mappedData;
};

/**
 * Gets all bookings (admin only)
 */
export const getAllBookings = async (): Promise<BookingData[]> => {
  try {
    const response = await api.get('/bookings');
    
    // Map backend fields to frontend fields for each booking
    const bookings = response.data.data.map((booking: any) => ({
      ...booking,
      barberId: booking.barber_id ?? booking.barberId,
      serviceId: booking.service_id ?? booking.serviceId,
      imageUrl: booking.image_url,
      // Format fields to match the admin dashboard expectations using names instead of IDs
      barber: booking.barber_name ?? 'Unknown Barber', // Use barber name instead of ID
      service: booking.service_name ?? 'Unknown Service', // Use service name instead of ID
      dateTime: `${booking.date} ${booking.time}`,
      formattedDate: booking.date,
      selectedTime: booking.time,
      // Initialize admin-specific fields
      emailReminder: false,
      discountApplied: 0
    }));
    
    console.log('Fetched all bookings:', bookings);
    return bookings;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    throw error;
  }
};

/**
 * Updates a booking
 */
export const updateBooking = async (
  id: string, 
  bookingData: Partial<BookingData>
): Promise<BookingData> => {
  const response = await api.put(`/bookings/${id}`, bookingData);
  return response.data.data;
};

/**
 * Updates a booking status
 */
export const updateBookingStatus = async (
  id: string, 
  status: 'confirmed' | 'pending' | 'cancelled'
): Promise<BookingData> => {
  try {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    
    // Map backend fields to frontend fields
    const bookingData = response.data.data;
    
    // Map the response data to match frontend expectations
    const mappedData: BookingData = {
      ...bookingData,
      barberId: bookingData.barber_id ?? bookingData.barberId,
      serviceId: bookingData.service_id ?? bookingData.serviceId,
      imageUrl: bookingData.image_url,
      // Additional fields for admin dashboard - using names instead of IDs
      barber: bookingData.barber_name ?? 'Unknown Barber',
      service: bookingData.service_name ?? 'Unknown Service',
      dateTime: `${bookingData.date} ${bookingData.time}`,
      formattedDate: bookingData.date,
      selectedTime: bookingData.time
    };
    
    console.log(`Updated booking ${id} status to ${status}:`, mappedData);
    return mappedData;
  } catch (error) {
    console.error(`Error updating booking ${id} status:`, error);
    throw error;
  }
};

/**
 * Deletes a booking
 */
export const deleteBooking = async (id: string): Promise<void> => {
  await api.delete(`/bookings/${id}`);
};
