//No Use
export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string[];
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
  maxGuests:number;
  description: string;
  isAvailable: boolean;
}

// กำหนด Type สำหรับ Props ที่จะรับเข้ามา
export interface SearchAvailableRoomsProps {
  onSearch: (checkIn: string, checkOut: string, guests: number) => void;
}
export type RoomTypeOption = 'All Room Types' | 'Suite' | 'Deluxe' | 'Standard';
export type PriceOption = 'Any Price' | 'Under ฿1500' | '฿1500 - ฿3000' | 'Over ฿3000';
export interface SearchRoomProps {
    onFilterChange?: (filters: {
        roomType: RoomTypeOption;
        price: PriceOption;
        checkIn: string;
        checkOut: string;
        guests: number;
        // Add more filter fields if needed
    }) => void;
}

export interface BookingAdmin {
  id: string;
  users: {
    name: string;
    email: string;
  };
  rooms: {
    room_name: string ;
    room_type: string | null;
  };
  check_in: string;  // ISO Date string
  check_out: string; // ISO Date string
  total_price: number;
  paid_amount: number;
  status_reservation: "confirmed" | "canceled" | "pending" | "Not yet paid" | "checked-in"| "checked-out"; // Specific status values from the screenshot
  phone_number?:string;
  note?:string;
  room_id?:string;
  
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
    room_name: string;
    room_type: string;
    price: number;
    max_guests: number;
    room_status: 'available' | 'unavailable' ;
    description: string;
    url_picture: string[];
}

export interface RoomDetailAdmin {
    id: string;
    room_name: string;
    room_type: string;
    price: number;
    max_guests: number;
    room_status: 'available' | 'unavailable'| 'under Maintenance' ;
    description: string;
    url_picture: string[];
}

export interface UserBooking {
  id: string;
  users: {
    name: string;
    email: string;
  };
  rooms: {
    room_name: string;
    id:string;
    url_picture: string[];
    room_type: string | null;
  };
  check_in: string; // ISO Date string
  check_out: string; // ISO Date string
  total_price: number;
  paid_amount: number;
  status_reservation: "confirmed" | "canceled" | "pending" | "Not yet paid" | "checked-in" | "checked-out";
  phone_number?: string;
  note?: string;
  room_id?: string;
}


export interface BookingDetails {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialRequests: string;
  totalPrice: number;
  // เพิ่ม field อื่นๆ ที่จำเป็นสำหรับการบันทึกการจอง
}