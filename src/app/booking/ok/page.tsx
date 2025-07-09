'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer/InlandingPage';
import { useRouter } from 'next/navigation';

const BookingSuccessPage = () => {
  const router = useRouter();

  const handleGoToBookings = () => {
    router.push('/my-bookings');
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 px-4">
        <div className="flex flex-col items-center text-center gap-4 bg-green-50 p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-green-700">Booking Successful!</h1>
          <p className="text-gray-600 text-lg">Thank you for your reservation. We’ve confirmed your booking.</p>
          <button
            onClick={handleGoToBookings}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingSuccessPage;
