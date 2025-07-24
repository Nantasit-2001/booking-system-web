// services/bookingService.ts
import { UserBooking } from '@/types/types';

export const fetchMyBookings = async (token:string): Promise<UserBooking[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mybooking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data: UserBooking[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
