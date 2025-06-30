// components/RoomStatusRadio.tsx
import React from 'react';

interface RoomStatusRadioProps {
    currentStatus: 'Available' | 'Unavailable' | 'Under Maintenance';
    onStatusChange: (status: 'Available' | 'Unavailable' | 'Under Maintenance') => void;
}

const RoomStatusRadio: React.FC<RoomStatusRadioProps> = ({ currentStatus, onStatusChange }) => {
    const statuses = ['Available', 'Unavailable', 'Under Maintenance'] as const;

    return (
        <div className="flex flex-col space-y-2">
            {statuses.map((statusOption) => (
                <label key={statusOption} className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        name="roomStatus"
                        value={statusOption}
                        checked={currentStatus === statusOption}
                        onChange={() => onStatusChange(statusOption)}
                    />
                    <span className="ml-2 text-gray-700">{statusOption}</span>
                </label>
            ))}
        </div>
    );
};

export default RoomStatusRadio;