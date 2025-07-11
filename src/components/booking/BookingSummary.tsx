import React from 'react';
import { RoomDetail } from '@/types/types'; // ตรวจสอบให้แน่ใจว่า path ถูกต้อง
import { formatNumberWithCommas } from '@/utils/currency';
import { formatCurrency } from '@/utils/currency';
interface BookingSummaryProps {
  room: RoomDetail;
  checkInDate: string;
  checkOutDate: string;
  duration: number; // in nights
  roomRate: number;
  taxesFees: number;
  total: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  room,
  checkInDate,
  checkOutDate,
  duration,
  roomRate,
  taxesFees,
  total,
}) => {

  return (
    <div className="rounded-lg bg-white p-6 "> {/* เพิ่ม shadow-md เพื่อให้ดูดีขึ้น */}
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Booking Summary</h2>
      <div className="flex items-center space-x-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          {/* ใช้ Next.js Image component แทน <img> ปกติ */}
          <img
            src={room.url_picture[0]}
            alt={room.room_name}
            style={{ objectFit: 'cover' }}
            className="rounded-md"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{room.room_name}</h3>
          <p className="text-sm text-gray-500">
            {room.room_type} &bull; {room.max_guests} Guests
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {/* จัดรูปแบบราคาต่อคืน */}
            <span className="font-bold">{`${formatNumberWithCommas(room.price)} baht per night`}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Check-in:</span>
          <span className="font-medium text-gray-800">{checkInDate}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Check-out:</span>
          <span className="font-medium text-gray-800">{checkOutDate}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium text-gray-800">{duration} nights</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Room rate ({duration} nights):</span>
          {/* ใช้ formatCurrency สำหรับ roomRate */}
          <span className="font-medium text-gray-800">{formatCurrency(roomRate)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Taxes & fees:</span>
          {/* ใช้ formatCurrency สำหรับ taxesFees */}
          <span className="font-medium text-gray-800">{formatCurrency(taxesFees)}</span>
        </div>
         <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-medium text-gray-800">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
          <span>Deposit:</span>
          {/* ใช้ formatCurrency สำหรับ total */}
          <span>{formatCurrency(total/2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;