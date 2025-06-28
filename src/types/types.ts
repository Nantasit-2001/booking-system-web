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