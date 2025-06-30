'use client';
import SearchAvailableRooms from "@/components/SearchAvailableRooms";
import { useState, useRef } from "react"; // Import useRef
import { X } from "@deemlol/next-icons";
import Dropdown, { DropdownRef } from "@/components/Dropdown"; // Import DropdownRef

type RoomTypeOption = 'All Room Types' | 'Single' | 'Double' | 'Suite';
type PriceOption = 'Any Price' | 'Under $100' | '$100 - $200' | 'Over $200';
type GuestsOption = 'Any Guests' | '1 Guest' | '2 Guests' | '3+ Guests';
type SortOption = 'Sort by Price' | 'Sort by Rating' | 'Sort by Popularity';

const SearchRoom: React.FC = () => {
    const [checkInDate, setCheckInDate] = useState<string>('');
    const [checkOutDate, setCheckOutDate] = useState<string>('');
    const [numGuests, setNumGuests] = useState<number>(0);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    // State for Filter Dropdowns
    const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeOption>('All Room Types');
    const [selectedPrice, setSelectedPrice] = useState<PriceOption>('Any Price');
    const [selectedGuests, setSelectedGuests] = useState<GuestsOption>('Any Guests');

    // State for Sort Dropdown
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>('Sort by Price');

    // Refs for Dropdown components for clearing
    const roomTypeDropdownRef = useRef<DropdownRef>(null);
    const priceDropdownRef = useRef<DropdownRef>(null);
    const guestsDropdownRef = useRef<DropdownRef>(null);
    const sortDropdownRef = useRef<DropdownRef>(null);

    // Available options for dropdowns
    const roomTypeOptions: RoomTypeOption[] = ['All Room Types', 'Single', 'Double', 'Suite'];
    const priceOptions: PriceOption[] = ['Any Price', 'Under $100', '$100 - $200', 'Over $200'];
    const guestsOptions: GuestsOption[] = ['Any Guests', '1 Guest', '2 Guests', '3+ Guests'];
    const sortOptions: SortOption[] = ['Sort by Price', 'Sort by Rating', 'Sort by Popularity'];

    const handleSearchResults = (checkIn: string, checkOut: string, guests: number) => {
        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);
        setNumGuests(guests);
        setHasSearched(true);
        console.log('Search results received in TopContent:', { checkIn, checkOut, guests });
    };

    const handleClearAllFilters = () => {
        roomTypeDropdownRef.current?.clearSelection();
        priceDropdownRef.current?.clearSelection();
        guestsDropdownRef.current?.clearSelection();
        sortDropdownRef.current?.clearSelection(); // Clear sort as well if desired
        console.log("All filters cleared!");
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
                        onSelect={(value) => {
                            setSelectedRoomType(value as RoomTypeOption);
                            console.log('Selected Room Type:', value);
                        }}
                    />
                    {/* Price Dropdown */}
                    <Dropdown
                        ref={priceDropdownRef}
                        label="Price"
                        options={priceOptions}
                        selectedValue={selectedPrice}
                        onSelect={(value) => {
                            setSelectedPrice(value as PriceOption);
                            console.log('Selected Price:', value);
                        }}
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
                      <h3>{24} rooms found</h3> {/* This should be dynamic based on actual search results */}
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 font-semibold text-lg">
                        <h3>{24} rooms found</h3> {/* This should be dynamic based on actual search results */}
                </div>
            </div>
            
        </section>
    );
}

export default SearchRoom;