'use client'
import React,{useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import SearchRoom from "@/components/page/rooms/SearchRoom";
import HotelRoomCard from "@/components/card/RoomCard";
import { SearchRoomProps } from "@/types/types";
import { fetchRoomsAvailable } from "@/services/room";
import { RoomDetail } from "@/types/types";
import { useRoomSearch } from "@/Context/context";
import { useRouter } from 'next/navigation'; 

const BookingPage: React.FC = () => {
  const [rooms, setRooms] = useState<RoomDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {checkIn, checkOut, guests,} = useRoomSearch();
  const [price, setPrice] = useState<string | number | null>(null);
  const [roomType, setRoomType] = useState<string>('');
  const [search,setSearch] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setSearch(false)
    try {
      const data = await fetchRoomsAvailable(checkIn, checkOut);
      const roomDetails = data as any[];
      let filteredRooms = roomDetails;

      // Filter by guests
      if (guests !== 0) {
        filteredRooms = filteredRooms.filter(
          (room) =>
        room.max_guests === guests ||
        room.max_guests === guests + 1 ||
        room.max_guests === guests - 1
        );
      }

      // Filter by roomType
      if (roomType && roomType !== "All Room Types") {
        filteredRooms = filteredRooms.filter(
          (room) => room.room_type === roomType
        );
      }

      // Filter by price
      if (price && price !== "Any Price") {
        filteredRooms = filteredRooms.filter((room) => {
          const roomPrice = Number(room.price);
          if (price === "Under ฿1500") return roomPrice < 1500;
          if (price === "฿1500 - ฿3000") return roomPrice >= 1500 && roomPrice <= 3000;
          if (price === "Over ฿3000") return roomPrice > 3000;
          return true;
        });
      }

      setRooms(filteredRooms);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };
  if(search)fetchData();
}, [search]);

  
  const handleSearch: SearchRoomProps['onFilterChange'] = (filters) => {
    setPrice(filters.price);
    setRoomType(filters.roomType);
    setSearch(true);
  };

  const handleViewDetails = (id: string) => {
    const room = rooms.find((room) => room.id === id);
    if (!room) return;
    router.push(`/rooms/${id}`);
  }
    return (
    <div>
      <Navbar />
      <SearchRoom onFilterChange={handleSearch} roomsCount={rooms.length} />
      <div className=" bg-gray-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-16 py-16 justify-center items-center place-items-center">
      
      {loading ? (
            <div className="flex justify-center items-center col-span-full py-20">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-blue-600 text-lg font-semibold">กำลังโหลดข้อมูลห้องพัก...</span>
            </div>
            </div>
        ) : (
          rooms.map((room, index) => (
            <HotelRoomCard
              key={index}
              id={room.id} // ✅ ส่ง id ไป
              imageUrl={room.url_picture[0]}
              roomName={room.room_name}
              pricePerNight={Number(room.price)}
              description={room.description}
              isAvailable={room.room_status === "available"}
              onViewDetails={handleViewDetails} // ✅ ส่ง function ไป
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookingPage;
    