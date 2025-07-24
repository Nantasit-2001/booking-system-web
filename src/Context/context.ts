'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

type RoomSearchContextType = {
  checkIn: string;
  setCheckIn: (date: string) => void;
  checkOut: string;
  setCheckOut: (date: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
};

const RoomSearchContext = createContext<RoomSearchContextType | undefined>(undefined);

export const RoomSearchProvider = ({ children }: { children: ReactNode }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(0);

  return React.createElement(
    RoomSearchContext.Provider,
    { value: { checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests } },
    children
  );
};

export const useRoomSearch = () => {
  const context = useContext(RoomSearchContext);
  if (!context) throw new Error('useRoomSearch must be used within a RoomSearchProvider');
  return context;
};
