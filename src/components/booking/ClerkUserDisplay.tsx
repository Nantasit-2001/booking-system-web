import React from 'react';

interface ClerkUserDisplayProps {
  username: string;
  email: string;
}

const ClerkUserDisplay: React.FC<ClerkUserDisplayProps> = ({ username, email }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          User name
        </label>
        <input
          type="text"
          id="firstName"
          value={username} // สมมติ username เป็น "First Last"
          readOnly
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="emailAddress"
          value={email}
          readOnly
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default ClerkUserDisplay;