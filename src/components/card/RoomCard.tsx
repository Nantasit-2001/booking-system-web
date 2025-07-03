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
    <div className=" h-[460px] lg:w-[305px] xl:w-[400px] rounded-xl overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 flex flex-col">
  <div className="relative w-full h-60">
    <Image
      className="object-cover"
      src={imageUrl}
      alt={roomName}
      fill
      sizes="320px"
      style={{ objectFit: 'cover' }}
    />
    {isAvailable && (
      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        Available
      </div>
    )}
  </div>
  <div className="flex-1 p-5 flex flex-col">
    <div className="relative flex justify-between items-baseline mb-5">
      <h3 className="text-xl font-semibold text-gray-800">{roomName}</h3>
      <p className="text-2xl font-bold text-blue-600">${pricePerNight}</p>
      <p className="absolute right-[-2px] top-6.5 text-right text-sm text-gray-500 mb-4">per night</p>
    </div>
    <p className="text-gray-700 text-base mb-4 flex-1 line-clamp-4">
      {description}
    </p>
    <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer mt-auto">
      View Details
    </button>
  </div>
</div>
  );
};

export default HotelRoomCard;