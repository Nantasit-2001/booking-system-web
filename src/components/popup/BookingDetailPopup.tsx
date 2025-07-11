'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingAdmin } from "@/types/types";

type BookingDetailPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  reservation: BookingAdmin
};

const dialogVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const BookingDetailPopup: React.FC<BookingDetailPopupProps> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  if (!reservation) return null;

  const {
    id,
    check_in,
    check_out,
    note,
    paid_amount,
    phone_number,
    room_id,
    status_reservation,
    total_price,
    users,
    rooms,
  } = reservation;

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
            className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6"
            variants={dialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Booking details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 transition cursor-pointer"
                title="close"
              >
                ✕
              </button>
            </div>
            <hr className="mb-4" />

            <div className="space-y-2 text-sm">
              <div><strong>USER:</strong> {users.name}</div>
              <div><strong>Email:</strong> {users.email}</div>
              <div><strong>Tel:</strong> {phone_number || '-'}</div>
              <div><strong>Type Room:</strong> {rooms.room_type}</div>
              <div><strong>Name Room:</strong> {rooms.room_name}</div>
              <div><strong>Check-in:</strong> {new Date(check_in).toLocaleDateString()}</div>
              <div><strong>Check-out:</strong> {new Date(check_out).toLocaleDateString()}</div>
              <div><strong>status:</strong> {status_reservation}</div>
              <div><strong>Total Price:</strong> {Number(total_price).toLocaleString()} Bath</div>
              <div><strong>Paid amount:</strong> {Number(paid_amount).toLocaleString()} Bath</div>
              <div><strong>Outstanding Amount:</strong> {(Number(total_price) - Number(paid_amount)).toLocaleString()} Bath</div>
              <div><strong>Note:</strong> {note || '-'}</div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={onClose}
                className="cursor-pointer px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingDetailPopup;
