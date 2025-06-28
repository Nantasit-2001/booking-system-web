import React from 'react';
import Image from 'next/image'; // สำหรับ Next.js ใช้องค์ประกอบ Image เพื่อการปรับภาพให้เหมาะสม
import { HotelRoomCardProps } from '@/types/types'; // นำเข้า type สำหรับ props


const HotelRoomCard: React.FC<HotelRoomCardProps> = ({
  imageUrl,
  roomName,
  pricePerNight,
  description,
  isAvailable,
}) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105">
      <div className="relative">
        <Image
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={roomName}
          width={400} // กำหนด width และ height เพื่อประสิทธิภาพที่ดีขึ้นสำหรับ Next/Image
          height={200}
          layout="responsive" // หรือ 'fill' ขึ้นอยู่กับความต้องการ
        />
        {isAvailable && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Available
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{roomName}</h3>
          <p className="text-2xl font-bold text-blue-600">${pricePerNight}</p>
        </div>
        <p className="text-right text-sm text-gray-500 mb-4">per night</p>
        <p className="text-gray-700 text-base mb-4">
          {description}
        </p>

        <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelRoomCard;