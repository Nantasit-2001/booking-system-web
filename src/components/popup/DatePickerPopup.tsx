'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Variants } from 'framer-motion';
type DatePickerPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (checkIn: string, checkOut: string) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

const DatePickerPopup: React.FC<DatePickerPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialCheckIn = '',
  initialCheckOut = '',
}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
  }, [initialCheckIn, initialCheckOut, isOpen]);

const dialogVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(checkIn, checkOut); // ✅ ส่งออกไปให้ parent
    onClose(); // ✅ ปิด popup หลังส่ง
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 md:px-0"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-[600px]"
            variants={dialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-4 pb-0">
              <h2 className="text-xl font-semibold mt-1">เลือกวันที่เข้าพัก</h2>
            </div>
            <hr className="border-t border-gray-200" />
            <form onSubmit={handleSubmit} className="p-6 pt-4 grid grid-cols-4 gap-4 items-end">
              {/* Check-in */}
              <div className="col-span-2">
                <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  id="check-in"
                  className="text-gray-900 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 py-3"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              {/* Check-out */}
              <div className="col-span-2">
                <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  id="check-out"
                  className="text-gray-900 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 py-3"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-4 flex justify-end mt-2">
                <button
                  type="submit"
                  className="cursor-pointer bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  confirm
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DatePickerPopup;
