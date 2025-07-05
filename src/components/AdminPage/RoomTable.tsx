'use client';
import React, { useEffect, useState } from 'react';
import { RoomDetailAdmin } from '@/types/types'; // Adjust the import path as necessary
import Link from 'next/link';
import { fetchRoom,deleteRoom } from "@/services/room";
interface RoomTableProps {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddNewRoom: () => void;
}

const RoomTable: React.FC = () => {
    const [rooms, setRooms] = useState<RoomDetailAdmin[]>([]);

    useEffect(() => {
    const fetchRooms = async () => {
        try {
            const data = await fetchRoom();
            setRooms(data);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
        
    };
    fetchRooms();
    }, []);

const handleDeleteRoom = async (id: string) => {
  const confirmed = window.confirm("Are you sure you want to delete this room?");
  if (!confirmed) return;

  try {
    await deleteRoom(id); // เรียก API
    setRooms(prev => prev.filter(room => room.id !== id)); // อัปเดต state UI
    alert("Room deleted successfully.");
  } catch (error) {
    alert("Failed to delete room.");
    console.error(error);
  }
};
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Room Management</h2>
                <Link
                    href="/admin/rooms/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add New Room</span>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ROOM NAME
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ROOM TYPE
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                PRICE PER NIGHT
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                STATUS
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rooms.sort((a,b)=>b.price - a.price).map((room) => (
                            <tr key={room.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {room.room_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.room_type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ฿{Number(room.price).toFixed(2).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            room.room_status === 'available'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {room.room_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                                    <Link
                                        href={`/admin/rooms/${room.id}`}
                                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                                        title="Edit"
                                    >
                                        <div className="h-5 w-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 113.182 3.182l-9.19 9.19a2.25 2.25 0 01-1.06.586l-4.5 1.125a1.125 1.125 0 01-1.36-1.36l1.125-4.5a2.25 2.25 0 01.586-1.06l9.19-9.19zM18 6l-2-2m0 0L8.25 12l-3 3L6 18l3-3L18 6z" />
                                            </svg>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteRoom(room.id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                                        title="Delete"
                                    >
                                        <div className="h-5 w-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomTable;