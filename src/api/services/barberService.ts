import api from '../axiosClient';

/**
 * Types for barber data from the backend
 */
export interface BarberData {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  bio?: string;
  description?: string;
  specialties?: string[];
  imageUrl?: string;
  photo_url?: string;
  available?: boolean;
  rating?: number;
  workingHours?: {
    day: string;
    hours: string;
  }[];
}

/**
 * Gets all barbers
 */
export const getAllBarbers = async (): Promise<BarberData[]> => {
  try {
    const response = await api.get('/barbers');
    
    // Map the response data to ensure consistent property names
    const barbers = Array.isArray(response.data.data) 
      ? response.data.data.map((barber: any) => ({
          id: barber.id,
          name: barber.name,
          email: barber.email,
          phone: barber.phone,
          bio: barber.bio,
          description: barber.description,
          specialties: barber.specialties,
          imageUrl: barber.imageUrl ?? barber.photo_url,
          photo_url: barber.photo_url,
          available: barber.available !== false, // Default to true if not specified
          rating: barber.rating,
          workingHours: barber.workingHours
        }))
      : [];
    
    console.log('Fetched barbers:', barbers);
    return barbers;
  } catch (error) {
    console.error('Error fetching barbers:', error);
    throw error;
  }
};

/**
 * Gets a barber by ID
 */
export const getBarberById = async (id: string): Promise<BarberData> => {
  try {
    const response = await api.get(`/barbers/${id}`);
    const barber = response.data.data;
    
    // Map the response to ensure consistent property names
    return {
      id: barber.id,
      name: barber.name,
      email: barber.email,
      phone: barber.phone,
      bio: barber.bio,
      description: barber.description,
      specialties: barber.specialties,
      imageUrl: barber.imageUrl ?? barber.photo_url,
      photo_url: barber.photo_url,
      available: barber.available !== false, // Default to true if not specified
      rating: barber.rating,
      workingHours: barber.workingHours
    };
  } catch (error) {
    console.error(`Error fetching barber ${id}:`, error);
    throw error;
  }
};

/**
 * Gets available barbers for a specific date and time
 */
export const getAvailableBarbers = async (
  date: string,
  time: string
): Promise<BarberData[]> => {
  try {
    const response = await api.get('/barbers/available', {
      params: { date, time }
    });
    
    // Map the response data to ensure consistent property names
    const barbers = Array.isArray(response.data.data) 
      ? response.data.data.map((barber: any) => ({
          id: barber.id,
          name: barber.name,
          email: barber.email,
          phone: barber.phone,
          bio: barber.bio,
          description: barber.description,
          specialties: barber.specialties,
          imageUrl: barber.imageUrl ?? barber.photo_url,
          photo_url: barber.photo_url,
          available: true, // These are available barbers
          rating: barber.rating,
          workingHours: barber.workingHours
        }))
      : [];
    
    return barbers;
  } catch (error) {
    console.error(`Error fetching available barbers for ${date} ${time}:`, error);
    throw error;
  }
};