// lib/constants.ts
interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: { [key: string]: NavLink[] } = {
  quickLinks: [
    { label: "Rooms", href: "/rooms" },
  ],
  supportLinks: [
    { label: "Chat Bot", href: "/chat-bot" },
  ],
  // สามารถเพิ่มกลุ่ม Link อื่นๆ ได้ที่นี่
};

export const CONTACT_INFO = {
  phone: "+(88) 123-4567",
  email: "info@Ease_Hotel.com",
};

export const HOTEL_INFO = {
  name: "Ease Hotel",
  slogan: "Thinking of taking a break? Stay with Ease Hotel.",
  copyrightYear: 2024,
};








// สำหรับใช้ใน Header หรือส่วนอื่นๆ
export const HEADER_NAV_LINKS: NavLink[] = [
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const AUTH_LINK: NavLink = {
  label: "Login",
  href: "/login",
};

export const MY_BOOKINGS_LINK: NavLink = {
  label: "My Bookings",
  href: "/my-bookings",
};