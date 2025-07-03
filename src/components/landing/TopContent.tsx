// components/landing/TopContent.tsx
'use client'; // เพราะมีการรับ props ที่อาจจะเปลี่ยนแปลง และจะมีการ state ในอนาคตถ้าต้องการจัดการค่า searchResults

import React, { useState,useEffect } from 'react';
import SearchAvailableRooms from '../SearchAvailableRooms'; // Import Component SearchAvailableRooms
import Link from 'next/link'; // ใช้สำหรับสร้างลิงก์ไปยังหน้าอื่นๆ
import { scrollToSection } from '@/utils/scroll';
import CardImage from '../card/CardImage';
import { fetchRoomShow } from '@/services/room';
import { useRouter } from 'next/navigation';
const TopContent: React.FC = () => {
  // State สำหรับเก็บข้อมูลการค้นหาที่ได้รับจาก SearchAvailableRooms
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [numGuests, setNumGuests] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // เพิ่ม state เพื่อบอกว่ามีการค้นหาหรือยัง
  const [roomShow,setRoomShow]=useState<any>('');
  // ฟังก์ชันที่จะถูกเรียกเมื่อ SearchAvailableRooms ส่งข้อมูลกลับมา
  const router = useRouter()
  useEffect(() => {
      const fetchData = async () => {
      try {
        // สมมติว่าคุณมีฟังก์ชัน fetchRoomShow ที่ import มาแล้ว
        const roomsTemp = await fetchRoomShow();
        setRoomShow(roomsTemp)
        console.log(roomsTemp)
        // คุณสามารถ setState เพื่อเก็บข้อมูลห้องได้ที่นี่ถ้าต้องการ
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
      };
      fetchData();
    }, []);

  const handleSearchResults = (checkIn: string, checkOut: string, guests: number) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setNumGuests(guests);
    setHasSearched(true); // ตั้งค่าว่ามีการค้นหาแล้ว
    router.push("/rooms")

  };

  return (
    <section id='top-content' className="relative overflow-hidden pb-130 md:pb-60 flex flex-col items-center justify-center bg-white">
    <section className="relative bg-gradient-to-r from-blue-500 to-blue-800 w-full text-white py-20 md:py-40 overflow-hidden">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Section - Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 ">
          <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg font-semibold mb-8">
            Book premium hotel rooms with ease. Our smart chatbot helps you 24/7.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="/rooms" className="bg-[#f59e0b] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-colors duration-200">
              Search Rooms
            </Link>
            <button onClick={() => scrollToSection('why-choose')} className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section - Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pl-4">
          {/* ใช้ CardImage แทนที่รูปภาพเดิม */}
          <CardImage images={roomShow} />
        </div>
      </div>
    </section>
    <div className="absolute bottom-20 md:bottom-20 pointer-events-auto w-[80%] shadow-2xl rounded-2xl">
        <SearchAvailableRooms onSearch={handleSearchResults} />
    </div>
    </section>
  );
};

export default TopContent;