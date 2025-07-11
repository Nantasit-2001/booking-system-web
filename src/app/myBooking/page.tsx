// pages/my-bookings.tsx (ตัวอย่าง)
'use client'
import React,{useState, useEffect} from 'react';
import BookingCard from '@/components/card/UserinfoBookingCard';
import { UserBooking } from '@/types/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer/InlandingPage';
import { useAuth } from '@clerk/nextjs';
import { fetchMyBookings } from '@/services/mybooking';
import BookingDetailPopup from '@/components/popup/BookingDetailPopup';
import { useRouter } from 'next/navigation';
import { deleteOrCancelBookingById } from '@/services/booking';
import { LoadingComponent } from '@/components/loading';

const MyBookingsPage: React.FC = () => {
  // สมมติว่าคุณมีข้อมูลการจอง array มาจาก API หรือ state
  const { getToken } = useAuth();
  const router = useRouter()
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'Reserved' | 'Check out' | 'Cancel'>('ALL');


const handleView = (booking: UserBooking) => {
  setSelectedBooking(booking);
  setIsPopupOpen(true);
};

const handleBookAgain = () => {
    router.push(`/rooms/`);
};

const handleCancel = async (bookingId: string) => {
  const confirmDelete = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?');
  if (!confirmDelete) return; // ❌ ถ้าไม่ยืนยัน ให้หยุดทำงาน

  try {
    await deleteOrCancelBookingById(bookingId);
    window.location.reload(); // ✅ รีโหลดหน้าเมื่อยกเลิกเสร็จ
  } catch (error) {
    console.error('Error cancelling booking:', error);
    alert('ไม่สามารถยกเลิกการจองได้');
  }
};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getToken();
        if (!token)return;
         const data = await fetchMyBookings(token);
        setBookings(data);
      } catch (err) {
        // แสดง error หรือแจ้งเตือนผู้ใช้
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [getToken]);

  const filteredBookings = bookings.filter((booking) => {
  switch (filter) {
    case 'Reserved':
      return booking.status_reservation === 'confirmed' || booking.status_reservation === 'pending';
    case 'Check out':
      return booking.status_reservation === 'checked-out';
    case 'Cancel':
      return booking.status_reservation === 'canceled';
    default:
      return true; // 'ALL'
  }
});


  return (
    <>
    <Navbar/>
    {selectedBooking && (
    <BookingDetailPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        reservation={selectedBooking}
    />
    )}
    <div className="bg-gray-200">
    <div className='px-4 md:px-0 py-12'>
      <h1 className="text-4xl font-bold px-4 md:px-12 mb-6">My Bookings</h1>
      <div className="flex space-x-2 mb-6 md:px-12 ">
  <button
    className={`w-28 shadow-2xl py-2 rounded-md cursor-pointer ${
      filter === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
    }`}
    onClick={() => setFilter('ALL')}
  >
    ALL
  </button>
  <button
    className={`w-28 shadow-2xl py-2 rounded-md cursor-pointer ${
      filter === 'Reserved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
    }`}
    onClick={() => setFilter('Reserved')}
  >
    Reserved
  </button>
  <button
    className={`w-28 shadow-2xl py-2 rounded-md cursor-pointer ${
      filter === 'Check out' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
    }`}
    onClick={() => setFilter('Check out')}
  >
    Check out
  </button>
  <button
    className={`w-28 py-2 shadow-2xl rounded-md cursor-pointer ${
      filter === 'Cancel' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
    }`}
    onClick={() => setFilter('Cancel')}
  >
    Cancel
  </button>
</div>

<div className="flex flex-col gap-4 pb-12 md:px-10">
  {loading? 
    <LoadingComponent text='Loading booking information...'/>

    :
  filteredBookings.length === 0 ? (
    <div className='h-screen text-center text-gray-400 text-2xl pt-10'>No bookings found</div>
  ) : (
    filteredBookings.map((booking) => (
      <BookingCard 
        key={booking.id}
        booking={booking}
        onView={() => handleView(booking)}
        onCancel={() => handleCancel(booking.id)}
        onBookAgain={() => handleBookAgain()}
      />
    ))
  )}
</div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default MyBookingsPage;