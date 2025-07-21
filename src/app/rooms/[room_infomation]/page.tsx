'use client'; // This directive is required for client components in App Router

import { useEffect, useState, useRef  } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRoomById } from '@/services/room'; // Import your fetch function
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CardImage from '@/components/card/CardImage';
import DatePickerPopup from '@/components/popup/DatePickerPopup';
import { BookingHandler } from '@/components/auth/BlockBooking';
import { formatNumberWithCommas } from '@/utils/currency';
import { LoadingComponent } from '@/components/loading';
import { FloatingChatHandle } from '@/components/FloatingChat';

interface RoomData {
  id: string;
  room_name: string;
  price: number;
  max_guests: number;
  room_type: string;
  description: string;
  // เพิ่ม field สำหรับรูปภาพในอนาคต (ถ้ามี)
  url_picture: string[];
}

const RoomDetailsPage: React.FC = () => {
  const router = useRouter();
  const chatRef = useRef<FloatingChatHandle>(null)
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingRequested, setBookingRequested] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [clickChat,setClickChat] = useState<boolean>(false)

  useEffect(() => {
    const fetchAndSetRoomData = async () => {
      // Access the dynamic ID from the URL
      const id = window.location.pathname.split('/').pop();
      if (!id) {
        setError("Room ID not found in URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchRoomById(id);
        setRoomData(data);
      
      } catch (err) {
        console.error("Failed to fetch room details:", err);
        setError("Failed to load room details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetRoomData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingComponent text='loading room details...'/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No room data available.</p>
      </div>
    );
  }

const handleBooking = (checkInDate: string, checkOutDate: string) => {
  setCheckIn(checkInDate);
  setCheckOut(checkOutDate);
  setBookingRequested(true); 
  setResultMessage(null); // reset message
};


  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <Navbar/>

      <DatePickerPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleBooking}
        initialCheckIn=""
        initialCheckOut=""
      />
      <div className="max-w-6xl mx-auto p-6 rounded-lg py-8 pb-18">
        <div className="flex items-center text-blue-600 mb-6">
          <div onClick={() => router.back()} className='flex cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
          </div>
          <span className="ml-4 text-gray-500">|</span>
          <span className="ml-4 text-gray-800">Room Details</span>
        </div>

        <div className="grid md:flex md:justify-between gap-6 w-full ">
          {/* Main Image Section - Gray Placeholder */}
          <div className='w-full'>
            <CardImage images={roomData.url_picture}  />
          </div>
          {/* Room Details */}
          <div className='bg-gray-100 p-8 rounded-2xl shadow-xl md:w-[60%] lg:w-[50%]'>
            <h1 className="text-3xl font-semibold pt-2 text-gray-800">{roomData.room_name}</h1>
            <div className="flex items-center text-gray-600 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.928 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.928 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.928 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.928 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              ({roomData.room_type})
            </div>

            <div className="text-4xl font-bold text-blue-500 mt-6 flex justify-between items-end">
              ฿{formatNumberWithCommas(roomData.price)} <span className="text-lg font-normal text-gray-500">per night</span></div>

            <div className="grid grid-cols-2 gap-4 text-gray-700 mt-10">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A7.962 7.962 0 0112 15c2.475 0 4.73.978 6.479 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{roomData.max_guests} Guests</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 00-2 2v2a2 2 0 002 2 2 2 0 002-2V8a2 2 0 00-2-2zm-3 1.05a2 2 0 013 0M7 12h.01M17 12h.01M12 18.01V20M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{roomData.room_type}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowPopup(true)}
              className="cursor-pointer mt-4 w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Book This Room
            </button>
            {bookingRequested && checkIn && checkOut && roomData?.id && (
  <BookingHandler
    roomId={parseInt(roomData.id)}
    checkIn={checkIn}
    checkOut={checkOut}
    onResult={({ success, message }) => {
      (success ? router.push(`/booking/${roomData.id}?checkIn=${checkIn}&checkOut=${checkOut}`) : setResultMessage(`❌ ${message}`));
      setBookingRequested(false); // หยุด trigger
    }}
  />
)} {resultMessage && <p className='text-center pt-2'>{resultMessage}</p>}

            <div className="text-center text-gray-500 mt-4 text-sm">
              Need help? 
              <button 
                onClick={()=>setClickChat(!clickChat)}
                className="text-blue-500 hover:underline cursor-pointer">Contact us</button>
            </div>
          </div>
        </div>

        {/* Thumbnail Images Section - Gray Placeholders */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {roomData.url_picture.map((url, index) => (
            <div key={index} className="relative w-full h-36 rounded-lg overflow-hidden">
              <img
                  src={url}
                  className='rounded-2xl absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                  alt={`image room ${index}`}
              />
            </div>
          ))}
        </div>

        {/* Room Description */}
        <div className="mt-12 bg-gray-100 p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold pb-3 mb-2">Room Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {roomData.description}
          </p>
        </div>

        {/* Policies - Hardcoded as per image */}
        <div className="mt-12 bg-gray-100 p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold pb-3 mb-3">Policies</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Check-in</h3>
              <p>3:00 PM - 11:00 PM</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Check-out</h3>
              <p>Until 12:00 PM</p>
            </div>

          </div>
        </div>
      </div>
      {/* <FloatingChat ref={chatRef}/> */}
      <Footer clickOpenChat={clickChat}/>
    </div>
  );
};

export default RoomDetailsPage;