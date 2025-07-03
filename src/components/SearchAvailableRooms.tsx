// components/SearchAvailableRooms.tsx
'use client';

import React from 'react';
import { SearchAvailableRoomsProps } from '@/types/types';
import { useRoomSearch } from '@/Context/context';

const SearchAvailableRooms: React.FC<{ onSearch: SearchAvailableRoomsProps['onSearch'] }> = ({ onSearch }) => {
  const { checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests } = useRoomSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut ) {
      alert('Please fill in all search fields.');
      return;
    }
    onSearch(checkIn, checkOut, guests);
  };

  return (
    <div className="flex flex-col gap-4 border-1 border-gray-300 bg-gray-100 rounded-2xl shadow-lg p-6 w-full  relative z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Search Available Rooms</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Check-in Date */}
        <div>
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <input
            type="date"
            id="check-in"
            className="text-gray-900 mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 py-4"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <input
            type="date"
            id="check-out"
            className="text-gray-900  mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 py-4"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <select
            id="guests"
            className="text-gray-900 mt-1 block w-full rounded-md border-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 py-4"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          >
            {[0,2, 4, 6].map((num) => (
              <option key={num} value={num}>
              {num===0?"-":num} Guests
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-md shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};


export default SearchAvailableRooms;