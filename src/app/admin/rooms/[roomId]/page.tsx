'use client';

import React, { useState, useEffect } from 'react';
import AdminGuard from '@/components/auth/AdminGuard';
import { useRouter, useParams } from 'next/navigation'; // For App Router
// If using Pages Router, it would be: import { useRouter } from 'next/router';

import Dropdown from '@/components/Dropdown'; // Adjust path as necessary
import RoomStatusRadio from '@/components/AdminPage/RoomStatusRadio';
import ImageUploadDisplay from '@/components/AdminPage/ImageUploadDisplay'; // Adjust path as necessary
import { RoomDetail } from '@/types/types'; // Adjust path as necessary

// Mock data for a room (to simulate data fetched in Edit mode)
const mockRoomData: RoomDetail = {
    id: "RM001",
    name: "Ocean View Suite",
    roomType: "Suite",
    pricePerNight: 350,
    maxGuests: 4,
    status: 'Available',
    description: "Spacious suite with breathtaking ocean views, featuring a king-size bed, separate living area, marble bathroom, and private balcony. Perfect for romantic getaways or business travelers seeking luxury.",
    images: [
        "https://via.placeholder.com/150/FF5733/FFFFFF?text=Room+Img+1",
        "https://via.placeholder.com/150/3366FF/FFFFFF?text=Room+Img+2",
        "https://via.placeholder.com/150/33FF57/FFFFFF?text=Room+Img+3"
    ]
};

// Mock list of room types for the Dropdown
const mockRoomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive'];

const RoomManagementPage: React.FC = () => {
    const router = useRouter();
    const params = useParams(); // For App Router
    const roomId = params.roomId as string | undefined; // 'undefined' for create mode

    const [isEditMode, setIsEditMode] = useState(false);
    const [roomData, setRoomData] = useState<RoomDetail>({
        id: '',
        name: '',
        roomType: '',
        pricePerNight: 0,
        maxGuests: 0,
        status: 'Available', // Default status for new rooms
        description: '',
        images: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (roomId && roomId !== 'create') { // Check if roomId exists and is not 'create'
            setIsEditMode(true);
            // Simulate fetching room data for editing
            const fetchRoomData = async () => {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call delay
                setRoomData(mockRoomData); // Set mock data for demonstration
                setIsLoading(false);
            };
            fetchRoomData();
        } else {
            setIsEditMode(false);
            // For 'create' mode, ensure roomData is reset to initial empty state
            setRoomData({
                id: '',
                name: '',
                roomType: '',
                pricePerNight: 0,
                maxGuests: 0,
                status: 'Available',
                description: '',
                images: []
            });
            setIsLoading(false);
        }
    }, [roomId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRoomData(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setRoomData(prev => ({ ...prev, pricePerNight: isNaN(value) ? 0 : value }));
    };

    const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setRoomData(prev => ({ ...prev, maxGuests: isNaN(value) ? 0 : value }));
    };

    const handleRoomTypeSelect = (type: string) => {
        setRoomData(prev => ({ ...prev, roomType: type }));
    };

    const handleStatusChange = (newStatus: 'Available' | 'Unavailable' | 'Under Maintenance') => {
        setRoomData(prev => ({ ...prev, status: newStatus }));
    };

    const handleImagesChange = (newImages: string[]) => {
        setRoomData(prev => ({ ...prev, images: newImages }));
    };

    const handleSaveChanges = () => {
        console.log("Saving changes...", roomData);
        // This is where you would send roomData to your backend API
        // Example: axios.post('/api/rooms', roomData) or axios.put(`/api/rooms/${roomData.id}`, roomData)
        alert(`Changes saved for room: ${roomData.name || 'New Room'}`);
        // Optionally redirect back to room list or show success message
    };

    const handleCancel = () => {
        router.back(); // Go back to the previous page
    };

    const handleDeleteRoom = () => {
        if (window.confirm(`Are you sure you want to delete "${roomData.name}"?`)) {
            console.log("Deleting room:", roomData.id);
            // Call API to delete room
            // Example: axios.delete(`/api/rooms/${roomData.id}`)
            alert(`Room "${roomData.name}" deleted.`);
            router.push('/rooms'); // Redirect to room list after deletion
        }
    };

    if (isLoading) {
        return <div className="p-6 text-center text-gray-600">Loading room details...</div>;
    }

    return (
        <AdminGuard>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 pb-3 mb-8">
                {/* Header Section */}
                <div className="flex justify-between items-center pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {isEditMode ? roomData.name || 'Edit Room' : 'Add New Room'}
                        </h1>
                        {isEditMode && roomData.id && (
                            <p className="text-gray-500 text-sm">Room ID: #{roomData.id}</p>
                        )}
                    </div>
                    {isEditMode && roomData.status === 'Available' && (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Available
                        </span>
                    )}
                     {isEditMode && roomData.status === 'Unavailable' && (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Unavailable
                        </span>
                    )}
                     {isEditMode && roomData.status === 'Under Maintenance' && (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            Under Maintenance
                        </span>
                    )}
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                            <input
                                type="text"
                                name="name"
                                id="roomName"
                                value={roomData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g., Ocean View Suite"
                            />
                        </div>
                        <div>
                            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                            <Dropdown
                                label="Room Type"
                                options={mockRoomTypes}
                                selectedValue={roomData.roomType}
                                onSelect={handleRoomTypeSelect}
                            />
                        </div>
                        <div>
                            <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">฿</span>
                                </div>
                                <input
                                    type="number"
                                    name="pricePerNight"
                                    id="pricePerNight"
                                    value={roomData.pricePerNight}
                                    onChange={handlePriceChange}
                                    className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="0.00"
                                    min="0"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                            <input
                                type="number"
                                name="maxGuests"
                                id="maxGuests"
                                value={roomData.maxGuests}
                                onChange={handleGuestsChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="1"
                                min="1"
                            />
                        </div>
                    </div>
                </div>

                {/* Room Status */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Status</h3>
                    <RoomStatusRadio
                        currentStatus={roomData.status}
                        onStatusChange={handleStatusChange}
                    />
                </div>

                {/* Room Description */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Description</h3>
                    <textarea
                        name="description"
                        id="roomDescription"
                        rows={4}
                        value={roomData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                        placeholder="Enter room description..."
                    ></textarea>
                </div>

                {/* Room Images */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Images</h3>
                    <ImageUploadDisplay
                        images={roomData.images}
                        onImagesChange={handleImagesChange}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                    <div>
                        <button
                            type="button"
                            onClick={handleSaveChanges}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={handleDeleteRoom}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.924a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L5.25 19.673a2.25 2.25 0 002.244 2.077h8.492a2.25 2.25 0 002.244-2.077L19.5 5.79m-4.46-1.503l-2.004-2.003a1.5 1.5 0 00-1.06-.44l-2.913.001C6.077 2.003 4.5 3.58 4.5 5.5V6h15v-.5c0-1.92-1.577-3.5-3.5-3.5h-2.913a1.5 1.5 0 00-1.06-.44z" />
                            </svg>
                            Delete Room
                        </button>
                    )}
                </div>
            </div>
        </div>
    </AdminGuard>
    );
};

export default RoomManagementPage;