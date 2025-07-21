// app/booking/[id]/page.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useSearchParams } from 'next/navigation';
import { RoomDetail } from '@/types/types';
import { fetchRoomById } from '@/services/room';
import GuestInformationForm from '@/components/booking/GuestInformationForm';
import BookingSummary from '@/components/booking/BookingSummary';
import QRCodePayment from '@/components/booking/QRCodePayment';
import { createQrPayment } from '@/services/qrCodePayment';
import { fetchClerkUserData } from '@/services/auth';
import { useAuth } from '@clerk/nextjs'; // สำหรับใช้ Client-side Clerk Hooks
import { useRouter } from 'next/navigation';
import { BookingHandler } from '@/components/auth/BlockBooking';
import { LoadingComponent } from '@/components/loading';
import { PopupAlert } from '@/components/popup/PopupAlert';

const BookingPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = params.id as string;
  const router=useRouter()
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [clerkUsername, setClerkUsername] = useState('');
  const [clerkEmail, setClerkEmail] = useState('');
  const [userAuthToken, setUserAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [chargeId, setChargeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [bookingRequested, setBookingRequested] = useState<boolean>(true);
  const [alert, setAlert] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmOnly?: boolean;
    onConfirm?: () => void;
    back?:boolean
  }>({ open: false, title: '', message: '', confirmOnly: true });
  
  const checkInDate = searchParams.get('checkIn') || 'N/A';
  const checkOutDate = searchParams.get('checkOut') || 'N/A';

  // ใช้ useAuth() hook ใน Client Component
  const { isLoaded, getToken } = useAuth();

  // ... (ส่วนของ duration, roomRate, taxesFees, total เหมือนเดิม)
  const duration = useMemo(() => {
    if (checkInDate === 'N/A' || checkOutDate === 'N/A') {router.push('/'); return 0 };
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkInDate, checkOutDate]);

  const roomRate = useMemo(() => {
    if (!room) return 0;
    return room.price * duration;
  }, [room, duration]);

  const taxesFees = useMemo(() => {
    return roomRate * 0.12;
  }, [roomRate]);

  const total = useMemo(() => {
    return roomRate + taxesFees;
  }, [roomRate, taxesFees]);

  useEffect(() => {
    const durationInSeconds = 15 * 60;
    let remaining = durationInSeconds;

    const intervalId = setInterval(() => {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;

      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setTimeLeft(formatted);
      remaining--;

      if (remaining < 0) {
        clearInterval(intervalId);

        setAlert({
          open: true,
          title: 'out of time',
          message: 'Please make a new reservation.',
          confirmOnly: true,
          onConfirm: () => {setAlert((prev) => ({ ...prev, open: false }));},
          back:true,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
// อยู่ภายใน BookingPage component
useEffect(() => {
  let intervalId: NodeJS.Timeout;
  const refreshToken = async () => {
    if (getToken) {
      const freshToken = await getToken();
      if (freshToken) setUserAuthToken(freshToken);
    }
  };
  if (isLoaded) {
    // refresh ทุก 1 นาที
    refreshToken(); // ดึงรอบแรกทันที
    intervalId = setInterval(refreshToken, 15 * 1000);
  }
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [isLoaded, getToken]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch room data
        const fetchedRoom = await fetchRoomById(roomId);
        setRoom(fetchedRoom);

        // Fetch Clerk user data
        if (isLoaded && getToken) { // ตรวจสอบว่า Clerk โหลดเสร็จแล้ว และ getToken มีค่า
          const userData = await fetchClerkUserData(getToken); // ส่ง getToken เข้าไป
          setClerkUsername(userData.username);
          setClerkEmail(userData.email);
        }
      } catch (err) {
        console.error("Failed to load booking data:", err);
        setError("Failed to load booking data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
        if (isLoaded) {
            loadData();
        }
    }
  }, [roomId, isLoaded, getToken]); // เพิ่ม getToken ใน dependency array

  const handleConfirmPayment = async () => {
    if (!room || !userAuthToken ) {
      setAlert({
      open: true,
      title: "An error occurred.",
      message: "Please cancel and book again. (Missing room data or authentication token. Cannot confirm payment.)",
      confirmOnly: true,
      onConfirm: () => setAlert({ ...alert, open: false }),
    });
    return;
  }
    if (!phoneNumber) {
      setAlert({
        open: true,
        title: "Please fill in the information.",
        message: "Please enter your phone number.",
        confirmOnly: true,
        onConfirm: () => setAlert({ ...alert, open: false }),
      });   
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createQrPayment({
        roomId: room.id,
        userAuthToken:userAuthToken,
        checkInDate,
        checkOutDate,
        phoneNumber,
        specialRequests,
        totalPrice: total,
        deposit: total/2
      });

      setQrCodeUrl(res.qrCodeUrl);
      setChargeId(res.chargeId);
    } catch (err: any) {
      console.error('Payment init failed:', err);
      setError('Could not create payment');
      setAlert({
        open: true,
        title: "An error occurred.",
        message: "Unable to generate QR Code. Please try again.",
        confirmOnly: true,
        onConfirm: () => setAlert({ ...alert, open: false }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingComponent text='Loading room details...'/>
  }

  if (error) {
    setAlert({
        open: true,
        title: "An error occurred.",
        message: `Unable to generate QR Code. Please try again. (${error})`,
        confirmOnly: true,
        onConfirm: () => setAlert({ ...alert, open: false }),
      });
  }

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-700">Room not found or invalid ID.</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    
    {bookingRequested && checkOutDate && checkInDate && roomId && (
      <BookingHandler
        roomId={Number(roomId)}
        checkIn={checkInDate}
        checkOut={checkOutDate}
        onResult={({ success }) => {
        (!success && router.push('/'));
        setBookingRequested(false);
        }}
      />
    )}

    <PopupAlert
      isOpen={alert.open}
      title={alert.title}
      message={alert.message}
      onClose={() => {(alert.back?router.back():setAlert({ ...alert, open: false }))}}
      onConfirm={alert.onConfirm}
      showCancelButton={!alert.confirmOnly}
    />  

    <div className="min-h-screen bg-gray-200 py-10 px-6">  
      {/* Step Indicator */}
      <div className="hidden sm:flex mx-auto mb-10 w-full max-w-6xl items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="font-medium text-gray-700">Room Selected</span>
        </div>
        <div className="h-0.5 w-16 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            2
          </span>
          <span className="font-semibold text-blue-600">Booking & Payment</span>
        </div>
        <div className="h-0.5 w-16 bg-gray-300"></div>
        <div className="flex items-center space-x-2 text-gray-500">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500">
            3
          </span>
          <span>success</span>
        </div>
      </div>

      <div className=" mx-auto flex flex-col md:flex-row justify-center gap-8">
        {/* Left Section: Guest Information */}
        <GuestInformationForm
          username={clerkUsername}
          email={clerkEmail}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          specialRequests={specialRequests}
          setSpecialRequests={setSpecialRequests}
        />

        {/* Right Section: Booking Summary & Payment Method */}
        <div className='shadow-md  bg-white rounded-lg xl:w-3/12'>  
          <BookingSummary
            room={room}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            duration={duration}
            roomRate={roomRate}
            taxesFees={taxesFees}
            total={total}
          />
          <hr className='mx-6 text-gray-400'/>
          <QRCodePayment
            onConfirmPayment={handleConfirmPayment}
            userAuthToken={userAuthToken}
            isLoading={isSubmitting}
            qrCodeUrl={qrCodeUrl || undefined}
            chargeId={chargeId || undefined}
          />
        </div>
      </div>
      <div className='text-center text-gray-500 pt-8 text-xl'>Please pay within {timeLeft} minutes.</div>
      <div className={`text-center text-gray-400 pt-2 text-[10px] `}>If there is less than 10 seconds left, you should cancel the booking and rebook for safe payment.</div>
    </div>
    <Footer/>
    </>
  );
};

export default BookingPage;