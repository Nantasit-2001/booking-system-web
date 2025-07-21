'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Variants } from 'framer-motion';

type PaymentPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amountPaidNow: number) => void;
  total: number;
  paid: number;
};

const dialogVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const PaymentPopup: React.FC<PaymentPopupProps> = ({ isOpen, onClose, onSubmit, total, paid }) => {
  const [amountPaidNow, setAmountPaidNow] = useState(0);
  const [error,setError] = useState("")
  const remaining = total - paid;

  useEffect(() => {
    setAmountPaidNow(0); // reset เมื่อเปิด popup ใหม่
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountPaidNow <= 0) return setError("Please enter the amount you wish to pay more than 0"); 
    onSubmit(amountPaidNow);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={()=>{setError(""); onClose();}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-[500px]"
            variants={dialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Payment record</h2>
              <div className="text-lg text-gray-700 space-y-2 mb-4">
                <div>Total price: <strong>{total.toLocaleString()} Bath</strong></div>
                <div>Paid amount: <strong>{paid.toLocaleString()} Bath</strong></div>
                <div>Outstanding balance: <strong>{remaining.toLocaleString()} Bath</strong></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    จำนวนเงินที่จ่ายเพิ่ม
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={remaining}
                    value={amountPaidNow}
                    onChange={(e) => setAmountPaidNow(Number(e.target.value))}
                    className="text-gray-900 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
                    required
                  />
                  <p className='text-red-600 text-[12px]'>{error?error:""}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="cursor-pointer bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Confirm payment
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentPopup;
