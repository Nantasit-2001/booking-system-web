// components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { scrollToSection } from '@/utils/scroll'; // นำเข้า function scrollToSection
import { usePathname, useRouter } from 'next/navigation';

// สมมติว่ามีข้อมูลผู้ใช้ที่ Login แล้ว
// คุณสามารถแทนที่ด้วย Context API, Redux, Zustand หรือการเรียก API จริงๆ
const isAuthenticated = false; // ตั้งค่าเป็น true เพื่อทดสอบว่า Login แล้ว
const user = {
  name: 'Sarah Johnson',
  // profilePicture: '/images/sarah_johnson.jpg', // ไม่มีรูปภาพแล้ว
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); // Ref สำหรับ Dropdown
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref สำหรับ Mobile Menu
  const pathname = usePathname();
  const router = useRouter();
  // Hook สำหรับปิด Dropdown เมื่อคลิกนอกพื้นที่
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // ปิด Profile Dropdown
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      // ปิด Mobile Menu เมื่อคลิกนอก Mobile Menu และไม่ใช่ปุ่ม Hamburger
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.hamburger-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // [] เพื่อให้ useEffect ทำงานครั้งเดียว

const handleNavigationToSection = (sectionId: string) => {
  if (pathname === '/') {
    scrollToSection(sectionId);
  } else {
    router.push(`/#${sectionId}`);
  }
};

  // Function สำหรับ Logout (คุณสามารถเพิ่ม Logic จริงๆ ที่นี่ได้)
  const handleLogout = () => {
    console.log('User logged out!');
    // เพิ่ม Logic การ Logout จริงๆ เช่น ลบ Token, Redirect ไปหน้า Login
    // ตัวอย่าง: router.push('/login');
    setIsProfileDropdownOpen(false); // ปิด Dropdown
    setIsMobileMenuOpen(false); // ปิด Mobile Menu
  };

  return (
    <nav className="bg-gray-100 shadow-md relative z-20 py-2"> {/* Navbar จะอยู่ด้านบนสุด */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
          <span role="img" aria-label="hotel-emoji">🏨</span>
          <span>Ease Hotel</span>
        </Link>

        {/* Hamburger Menu Button (สำหรับหน้าจอขนาดเล็ก) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hamburger-button text-gray-700 focus:outline-none focus:text-blue-600 cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links & Profile/Login */}
        {/* จะแสดงเฉพาะบนหน้าจอขนาดกลาง (md) ขึ้นไป */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/rooms" className="text-gray-700 hover:text-blue-600 font-medium">
            Rooms
          </Link>
          {isAuthenticated && (
            <Link href="/my-bookings" className="text-gray-700 hover:text-blue-700 font-medium">
              My Bookings
            </Link>
          )}
          {!isAuthenticated && (
            <>
<button onClick={() => handleNavigationToSection('footer')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">
  About
</button>
<button onClick={() => handleNavigationToSection('footer')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">
  Contact
</button>
            </>
          )}
        </div>
        <div className="hidden md:flex items-center">
          {/* User Profile / Login Button (Desktop) */}
          <div className="relative" ref={profileRef}>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                {/* จุดสีเขียว */}
                <div className='flex flex-row items-center justify-center gap-1'>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-gray-800 font-medium">{user.name}</span>
                </div>            
              </div>
            ) : (
              <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-sm">
                Login
              </Link>
            )}

            {/* Profile Dropdown Menu */}
            {isAuthenticated && isProfileDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-all duration-200 ease-out
                  ${isProfileDropdownOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                `}
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-md cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Overlay with Animation) */}
      {/* จะแสดงเมื่อ isMobileMenuOpen เป็น true และบนหน้าจอขนาดเล็ก */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-30 md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {isAuthenticated && (
            // แสดงจุดสีเขียวและชื่อด้านบนสุดเมื่อ Login แล้วใน Mobile Menu
            <div className="flex flex-col items-center py-4 border-b border-gray-200 mb-4">
              <span className="text-lg font-semibold text-gray-800">{user.name}</span>
            </div>
          )}

          {/* Navigation Links ใน Mobile Menu */}
          <div className="flex flex-col space-y-2 flex-grow"> {/* flex-grow เพื่อให้ปุ่ม logout อยู่ด้านล่างสุด */}
            <Link href="/rooms" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Rooms
            </Link>

            {isAuthenticated ? (
              <Link href="/my-bookings" className="block text-gray-700 hover:text-blue-700 font-medium py-2 px-4 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                My Bookings
              </Link>
            ) : (
              <>
                <Link href="/#footer" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/#footer" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Login/Logout Button ใน Mobile Menu (อยู่ด้านล่างสุด) */}
          <div className="mt-auto pt-4 border-t border-gray-200"> {/* mt-auto เพื่อดันลงล่างสุด */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full text-center text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-md shadow-sm cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="block text-center text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-md shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay สำหรับ Mobile Menu (เมื่อเมนูเปิด) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  backdrop-blur-sm z-25 md:hidden" // z-25 อยู่ระหว่าง Navbar (z-20) กับ Mobile Menu (z-30)
          onClick={() => setIsMobileMenuOpen(false)} // คลิกที่ overlay เพื่อปิดเมนู
        ></div>
      )}
    </nav>
  );
};

export default Navbar;