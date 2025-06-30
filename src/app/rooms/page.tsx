import Navbar from "@/components/Navbar";
import TopContentRoom from "@/components/page/rooms/SearchRoom";
import HotelRoomCard from "@/components/card/RoomCard";
const BookingPage: React.FC = () => {
  const roomData = [{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  },{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  },{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. ',
    isAvailable: true,
  },{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  },{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  },{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  },{
    imageUrl: '/images/deluxe-king-room.jpg', // ต้องมีภาพนี้อยู่ในโฟลเดอร์ public
    roomName: 'Deluxe King Room',
    pricePerNight: 149,
    description: 'Spacious room with king bed, city view, and modern amenities. Perfect for business or leisure travel.',
    isAvailable: true,
  }];
  return (
    <div>
      <Navbar />
      <TopContentRoom />
      {/* <div className="bg-gray-100 h-40">
                Here you would render your actual room results based on
                    checkInDate, checkOutDate, numGuests,
                    selectedRoomType, selectedPrice, selectedGuests, selectedSortOption
                {hasSearched && (
                    <p className="p-4">
                        Displaying results for check-in: {checkInDate}, check-out: {checkOutDate}, guests: {numGuests}.
                        Filters: Room Type: {selectedRoomType}, Price: {selectedPrice}, Guests: {selectedGuests}.
                        Sorted by: {selectedSortOption}.
                    </p>
                )}
            </div> */}
      <div className=" bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 py-16 justify-center items-center place-items-center">
        {roomData.map((room, index) => (
          <HotelRoomCard key={index} {...room} />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
    