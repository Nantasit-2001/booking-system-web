'use client'; // เนื่องจากมีการใช้ useState และ input events
import HotelRoomCard from "../card/RoomCard";
import { scrollToSection } from "@/utils/scroll";
import { useEffect, useState } from "react";
import { fetchRoomTypes } from "@/services/room";
import { useRouter } from 'next/navigation'
const RoomTypes: React.FC = () => {
    const [roomData, setRoomData] = useState<any>([]);
    const router = useRouter()
    useEffect(() => {
      const fetchRoomTypeData = async () => {
        try {
          const data = await fetchRoomTypes();
            setRoomData(data.sort((a, b)   => Number(b.price ?? 0) - Number(a.price ?? 0)));
        } catch (error) {
          console.error('Failed to fetch room type:', error);
        }
      };
      fetchRoomTypeData();
    }, []);

    const handleViewDetails = (id: string) => {
    const room = roomData.find((data:any) => data.id === id);
    if (!room) return;
    router.push(`/rooms/${id}`);
  }
    return (
       <section>
       <section className="mx-auto px-4 pt-18 pb-20 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 ">Our Room Types</h2>
            <p className="text-lg font-semibold text-gray-600 mb-8 text-center max-w-2xl">
                Choose from our variety of comfortable accommodations
            </p>
        </div>
        <div className="flex flex-col gap-6 px-6 xl:px-18 md:gap-10 xl:flex-row lg:gap-10">
        {roomData.map((data: any, idx: number) => (
            <HotelRoomCard
              key={idx}
              id={data.id} // ✅ ส่ง id ไป
              imageUrl={data.url_picture[0]}
              roomName={data.room_name}
              pricePerNight={Number(data.price)}
              description={data.description}
              isAvailable={data.room_status === "available"}
              onViewDetails={handleViewDetails} // ✅ ส่ง function ไป
            />
        ))}
          </div>
      </section>

      <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-800 w-full text-white py-20">
            <h2 className="text-3xl font-bold mb-4 ">Our Room Types</h2>
            <p className="text-lg font-semibold mb-4 text-center max-w-2xl">
                Choose from our variety of comfortable accommodations
            </p>
            <button onClick={() => scrollToSection('top-content')} className="bg-white text-blue-500 font-medium py-3 px-6 rounded-md shadow-md hover:bg-gray-100 transition duration-300 cursor-pointer">Get Started</button>
        </div>
    </section> 
    );
}
export default RoomTypes;