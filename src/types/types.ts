//No Use
export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
}

// สำหรับ Feature Card
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // อาจจะเป็น URL ของรูปภาพไอคอน, หรือ class ของ icon font
  iconBgColor?: string; // สีพื้นหลังของไอคอน (ถ้ามี)
  iconTextColor?: string; // สีของไอคอน (ถ้ามี)
}

// กำหนด Type สำหรับ Props ของ FeatureCard
export interface FeatureCardProps {
  icon: React.ReactNode; // icon จะเป็น ReactNode (เช่น SVG)
  colorIcon: string; // colorIcon จะเป็นสีที่ใช้สำหรับ Icon
  title: string;
  description: string;
}

export interface HotelRoomCardProps {
  imageUrl: string;
  roomName: string;
  pricePerNight: number;
  description: string;
  isAvailable: boolean;
}

// กำหนด Type สำหรับ Props ที่จะรับเข้ามา
export interface SearchAvailableRoomsProps {
  onSearch: (checkIn: string, checkOut: string, guests: number) => void;
}

//No Use
export interface RoomAdmin {
  id: string;
  room_name: string;
  room_type: string;
  price: number;
  max_guests: number;
  room_status: 'available' | 'unavailable' | 'under maintenance';
  description: string;
  url_picture: string[];
}

export interface BookingAdmin {
  Booking_id: string;
  User: string;
  Email: string;
  Room: string;
  Floor: number;
  status: 'Confirmed' | 'Pending' | 'Checked-in' | 'cancelled';
  Check_in: string;
  Total: string;
  Paid_Amount: string | number;
  Remaining: string | number;
}

export interface CardMetric {
  title: string;
  value: string | number;
  icon: React.ReactNode; // Or a specific icon component type
  bgColor: string; // Tailwind background color class
  textColor: string; // Tailwind text color class
}

// types/types.ts (if you have one, add this interface)
export interface RoomDetail {
    id: string;
    name: string;
    roomType: string;
    pricePerNight: number;
    maxGuests: number;
    status: 'Available' | 'Unavailable' | 'Under Maintenance';
    description: string;
    images: string[];
}