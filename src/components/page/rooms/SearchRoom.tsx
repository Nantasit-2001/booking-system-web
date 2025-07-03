'use client';
import SearchAvailableRooms from "@/components/SearchAvailableRooms";
import { useState, useRef } from "react"; // Import useRef
import { X } from "@deemlol/next-icons";
import Dropdown, { DropdownRef } from "@/components/Dropdown"; // Import DropdownRef
import { SearchRoomProps } from "@/types/types";
import { RoomTypeOption } from "@/types/types";
import { PriceOption } from "@/types/types";


const SearchRoom: React.FC<{
    onFilterChange: SearchRoomProps['onFilterChange'];
    roomsCount: number;
}> = ({ onFilterChange, roomsCount }) => {

    // State for Filter Dropdowns
    const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeOption>('All Room Types');
    const [selectedPrice, setSelectedPrice] = useState<PriceOption>('Any Price');

    // Refs for Dropdown components for clearing
    const roomTypeDropdownRef = useRef<DropdownRef>(null);
    const priceDropdownRef = useRef<DropdownRef>(null);

    // Available options for dropdowns
    const roomTypeOptions: RoomTypeOption[] = ['All Room Types' , 'Suite' , 'Deluxe' , 'Standard'];
    const priceOptions: PriceOption[] = ['Any Price', 'Under ฿1500', '฿1500 - ฿3000', 'Over ฿3000'];
    const handleSearchResults = (checkIn: string, checkOut: string, guests: number) => {
        if (onFilterChange) {
            onFilterChange({
                roomType: selectedRoomType,
                price: selectedPrice,
                checkIn,
                checkOut,
                guests,
            });
        }
    };

    const handleClearAllFilters = () => {
        roomTypeDropdownRef.current?.clearSelection();
        priceDropdownRef.current?.clearSelection();
        setSelectedRoomType('All Room Types');
        setSelectedPrice('Any Price');
    };

    // Call onFilterChange when filters change
    const handleRoomTypeChange = (value: string) => {
        setSelectedRoomType(value as RoomTypeOption);
    };

    const handlePriceChange = (value: string) => {
        setSelectedPrice(value as PriceOption);
    };

    return (
        <section>
            <section className="flex flex-col items-center gap-16 bg-gradient-to-r from-blue-500 to-blue-800 w-full text-white py-20 md:py-24 md:pb-12 ">
                <div className="px-8 flex flex-col items-center justify-between z-10">
                    <h1 className="text-6xl font-bold mb-4">Search Available Rooms</h1>
                    <p className="text-2xl text-gray-200">Find the perfect room for your stay</p>
                </div>
                <div className="pointer-events-auto w-[90%] shadow-2xl rounded-2xl">
                    <SearchAvailableRooms onSearch={handleSearchResults} />
                </div>
            </section>
            <div className="flex flex-col lg:flex-row items-center sm:justify-between bg-white py-6 sm:px-3 lg:px-14">
                <h3 className="font-semibold text-lg pb-4 sm:pb-4 lg:pb-0">Filter Results</h3>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 lg:gap-6 w-full px-2 md:w-[760px] lg:w-[550px]">
                    {/* Room Type Dropdown */}
                    <Dropdown
                        ref={roomTypeDropdownRef}
                        label="Room Type"
                        options={roomTypeOptions}
                        selectedValue={selectedRoomType}
                        onSelect={handleRoomTypeChange}
                    />
                    {/* Price Dropdown */}
                    <Dropdown
                        ref={priceDropdownRef}
                        label="Price"
                        options={priceOptions}
                        selectedValue={selectedPrice}
                        onSelect={handlePriceChange}
                    />
                    {/* Guests Dropdown */}
                    <button
                        className="flex items-center text-lg gap-0 text-gray-600 hover:text-blue-700 focus:outline-none cursor-pointer"
                        onClick={handleClearAllFilters}
                    >
                        <X size={18}/><span>Clear</span>
                    </button>
                    {/* Sort Dropdown */}
                    <div className=" lg:hidden flex items-center gap-2 font-semibold text-lg sm:ml-3 sm:w-[440px]">
                      <h3>{roomsCount} rooms found</h3>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 font-semibold text-lg">
                        <h3>{roomsCount} rooms found</h3>
                </div>
            </div>
            
        </section>
    );
}

export default SearchRoom;