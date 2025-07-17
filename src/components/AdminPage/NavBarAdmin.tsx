"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useClerk } from '@clerk/nextjs';
const NavBarAdmin: React.FC = () => {
    const pathname = usePathname();
    const isRooms = pathname === "/admin/rooms";
    const isBooking = pathname === "/admin/booking";
    const isDocuments = pathname === "/admin/documents";
    const { signOut } = useClerk();
    return (
        <nav className="bg-white p-4 shadow-sm flex justify-between items-center px-8 md:px-20">
            <div className="flex items-center sm:space-x-2 md:space-x-20">
                <h1 className="text-2xl font-bold text-gray-800">Hotel Admin Dashboard</h1>
                <div className="flex space-x-4">
                    <Link
                        href="/admin/rooms"
                        className={`font-medium pb-1 ${
                            isRooms
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        Room Management
                    </Link>
                    <Link
                        href="/admin/booking"
                        className={`font-medium pb-1 ${
                            isBooking
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        Booking Overview
                    </Link>
                    <Link
                        href="/admin/documents"
                        className={`font-medium pb-1 ${
                            isDocuments
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        Documents
                    </Link>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-green-600"></div>
                <span className="text-gray-700 font-semibold">Admin User</span>
                <button onClick={() => signOut(() => { window.location.href = '/'; })} 
                        className="cursor-pointer ml-4 px-2 rounded-2xl bg-red-600 text-white hover:bg-red-700 font-medium">
                        Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBarAdmin;