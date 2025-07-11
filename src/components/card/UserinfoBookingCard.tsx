// components/BookingCard.tsx
import React from 'react';
import { UserBooking } from '@/types/types';
import { formatCurrency } from '@/utils/currency';
interface BookingCardProps {
  booking: UserBooking;
  onView: () => void;
  onCancel: () => void;         
  onBookAgain: () => void; 
}

const getStatusColor = (status: UserBooking['status_reservation']) => {
  switch (status) {
    case 'confirmed':
    case 'checked-in':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Not yet paid':
    case 'canceled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusText = (status: UserBooking['status_reservation']) => {
  switch (status) {
    case 'confirmed':
      return 'confirmed';
    case 'pending':
      return 'Reserved';
    case 'canceled':
      return 'canceled';
    case 'Not yet paid':
      return 'No reservation';
    case 'checked-in':
      return 'checked-in';
    case 'checked-out':
      return 'checked-out';
    default:
      return 'ไม่ระบุสถานะ';
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const BookingCard: React.FC<BookingCardProps> = ({ booking,onView,onCancel,onBookAgain }) => {
  const isBookAgainVisible = booking.status_reservation === 'canceled' || booking.status_reservation === 'checked-out';
  const checkInDate = formatDate(booking.check_in);
  const checkOutDate = formatDate(booking.check_out);
  const numberOfNights = Math.round((new Date(booking.check_out).getTime() - new Date(booking.check_in).getTime()) / (1000 * 60 * 60 * 24)
);
  return (
    <div className="flex flex-col md:flex-row md:items-center bg-white rounded-2xl p-4 md:p-8 mb-4 shadow-xl">
      <div className="w-full  md:w-24 md:h-24 relative md:mr-4 rounded-md overflow-hidden md:flex-shrink-0 flex justify-center">
        <img
          src={booking.rooms.url_picture[0]}
          alt={booking.rooms.room_name}
          className="rounded-md "
        />
      </div>
      <div className='w-full b flex justify-between'>
      <div className="flex-1 p-2 md:pt-2 md:p-0">
       <div className="flex flex-col items-start mb-2 md:flex-row md:items-center">
          <h3 className="text-[18px] md:text-[16px] lg:text-xl font-bold text-gray-800">{booking.rooms.room_name}</h3>
          <div className={`px-2 py-1 rounded-full text-[12px] md:text-[10px] lg:text-[16px] mt-1 md:mt-0 md:ml-4 text-center font-semibold ${getStatusColor(booking.status_reservation)}`}>
            {getStatusText(booking.status_reservation)}
          </div>
        </div>
        <div className="text-[12px] lg:text-[16px] text-gray-600 mb-1 md:pt-0">
          <p>
  {checkInDate} - {checkOutDate} ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'})
</p>

          <p>
            {booking.rooms.room_type} • {booking.rooms.room_name.includes('King') ? 'เตียงคิงไซส์' : booking.rooms.room_name.includes('Queen') ? 'เตียงควีนไซส์' : booking.rooms.room_name.includes('Twin') ? 'เตียงคู่' : 'ประเภทเตียงไม่ระบุ'} • {booking.rooms.room_name.includes('City') ? 'วิวเมือง' : booking.rooms.room_name.includes('Garden') ? 'วิวสวน' : booking.rooms.room_name.includes('Street') ? 'วิวถนน' : booking.rooms.room_name.includes('Ocean') ? 'วิวทะเล' : 'วิวไม่ระบุ'}
          </p>
          <p className="mt-1">Booking ID: #{booking.id}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between mt-2 md:mt-0 md:ml-4 md:min-w-[120px]">
        <div className=' text-end'>
          <div className={`md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1`}>
            {formatCurrency(booking.paid_amount)}
          </div>
          <div className="text-[14px] mb-4">
            Amount paid
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
              <button 
                onClick={onView}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                View
              </button>
          {booking.status_reservation === 'confirmed' || booking.status_reservation === 'pending' ? (
            <>
              <button 
                onClick={onCancel}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Cancel
              </button>
            </>
          ) : null}

          {isBookAgainVisible && (
            <button 
              onClick={onBookAgain}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Book Again
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingCard;