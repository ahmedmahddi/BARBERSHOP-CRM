import { useState } from 'react';
import { 
  createBooking, 
  getBookingById,
  BookingFormData, 
  BookingData 
} from '@/api/services/bookingService';

interface UseBookingReturn {
  booking: BookingData | null;
  isLoading: boolean;
  error: string | null;
  submitBooking: (formData: BookingFormData, imageFile?: File) => Promise<BookingData>;
  fetchBooking: (id: string) => Promise<BookingData>;
  resetState: () => void;
}

/**
 * Custom hook for booking operations
 */
export function useBooking(): UseBookingReturn {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submit a booking with optional image
   */
  const submitBooking = async (formData: BookingFormData, imageFile?: File): Promise<BookingData> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await createBooking(formData, imageFile);
      setBooking(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message ?? 'Failed to create booking';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch a booking by ID
   */
  const fetchBooking = async (id: string): Promise<BookingData> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getBookingById(id);
      setBooking(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message ?? 'Failed to fetch booking';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset the hook state
   */
  const resetState = () => {
    setBooking(null);
    setIsLoading(false);
    setError(null);
  };

  return {
    booking,
    isLoading,
    error,
    submitBooking,
    fetchBooking,
    resetState
  };
}
