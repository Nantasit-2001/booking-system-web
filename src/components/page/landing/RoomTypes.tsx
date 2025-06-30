'use client'; // เนื่องจากมีการใช้ useState และ input events
import HotelRoomCard from "../../card/RoomCard";
import { scrollToSection } from "../../../utils/scroll";
const RoomTypes: React.FC = () => {
     const roomData = {
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  };
    return (
       <section>
       <section className="mx-auto px-4 pt-18 pb-20 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 ">Our Room Types</h2>
            <p className="text-lg font-semibold text-gray-600 mb-8 text-center max-w-2xl">
                Choose from our variety of comfortable accommodations
            </p>
        </div>
        <div className="flex flex-col gap-6 px-6 md:gap-10 lg:flex-row lg:gap-10">
          <HotelRoomCard {...roomData} />
          <HotelRoomCard {...roomData} />
          <HotelRoomCard {...roomData} />
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