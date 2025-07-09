import React from 'react';
import ClerkUserDisplay from './ClerkUserDisplay';

interface GuestInformationFormProps {
  username: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  specialRequests: string;
  setSpecialRequests: (value: string) => void;
}

const GuestInformationForm: React.FC<GuestInformationFormProps> = ({
  username,
  email,
  checkInDate,
  checkOutDate,
  phoneNumber,
  setPhoneNumber,
  specialRequests,
  setSpecialRequests,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md h-full md:w-8/14 xl:w-7/14">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Guest Information</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* ข้อมูลที่ดึงจาก Clerk (Read-only) */}
        <ClerkUserDisplay username={username} email={email} />

        {/* ช่องทางการติดต่อ (แก้ไขได้) */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Check-in Date (Read-only) */}
        <div>
          <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            type="text"
            id="checkInDate"
            value={checkInDate}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-gray-500 shadow-sm sm:text-sm"
          />
        </div>
        {/* Check-out Date (Read-only) */}
        <div>
          <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            type="text"
            id="checkOutDate"
            value={checkOutDate}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      {/* Special Requests (แก้ไขได้) */}
      <div className="mt-6">
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
          Special Requests
        </label>
        <textarea
          id="specialRequests"
          rows={6}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Any special requests or notes..."
        ></textarea>
      </div>
    </div>
  );
};

export default GuestInformationForm;