import { AnimatePresence, motion } from "framer-motion";

interface PopupAlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  showCancelButton?: boolean;
}

const dialogVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
};

export const PopupAlert = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  showCancelButton = false,
}: PopupAlertProps) => {
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
            className="bg-white rounded-3xl shadow-lg w-full max-w-[500px] p-6"
            variants={dialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold border-b-1 border-gray-300 pb-3 mb-2">{title}</h2>
            <p className="text-gray-700 mb-6">{message}</p>

            <div className="flex justify-end space-x-4">
              {showCancelButton && (
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={onConfirm || onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};