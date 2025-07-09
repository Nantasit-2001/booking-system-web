  // components/QRCodePayment.tsx
  import React, { useEffect,useState } from 'react';
  import { checkPaymentStatus } from '@/services/qrCodePayment';
  import { cancelBooking } from '@/services/booking';
  import { useRouter } from 'next/navigation';
  interface QRCodePaymentProps {
    onConfirmPayment: () => void;
    userAuthToken:string|null;
    isLoading: boolean;
    qrCodeUrl?: string;
    chargeId?: string;
  }

  const QRCodePayment: React.FC<QRCodePaymentProps> = ({
    onConfirmPayment,
    userAuthToken,
    isLoading,
    qrCodeUrl,
    chargeId,
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router=useRouter()

    const handelcancelBooking = async() =>{
      try{
      if(userAuthToken) 
        {await cancelBooking(userAuthToken)
          router.back()
        }
      }catch(error){
        console.log(error)
      }
    }

    const openModal = () => {
      if (qrCodeUrl) {
        setIsModalOpen(true);
      }
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    useEffect(() => {
      if (!qrCodeUrl || !chargeId) return;

      const interval = setInterval(async () => {
        if(!userAuthToken)return
        const data = await checkPaymentStatus(chargeId,userAuthToken);
        console.log(data,"===========")
        if (data.status === 'successful') {
          clearInterval(interval);
          window.location.href = '/booking/ok';
        }
      }, 5000);

      return () => clearInterval(interval);
    }, [chargeId,qrCodeUrl]);

    return (
      <div className="rounded-lg bg-white p-6">
        <h3 className=" flex items-center text-lg font-semibold text-gray-800 mb-2">Payment Method</h3>
        {qrCodeUrl && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-6"
            onClick={openModal}>
            <div className="relative h-full  ">
              <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
            
              {/* <h3 className='text-center text-gray-500'>Click Confirm Payment</h3> */}
        
          </div>
          <p className=" text-center text-sm text-gray-600">
            Scan QR code to pay
            <br />
            Secure payment via mobile app
          </p>
        </div>
      )}

  {/* Modal for Full-Screen QR Code */}
        {isModalOpen && qrCodeUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 py-8"
            onClick={closeModal} // Close modal when clicking outside the image
          >
            <div className="relative max-w-full h-full bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on the content itself
            >
              <button
                onClick={closeModal}
                className={`absolute -top-3 -right-3 p-2 bg-red-600 text-white rounded-full
                          hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75`}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={qrCodeUrl}
                alt="QR Code Full Size"
                className="h-full object-contain" // Constrain image size within modal
              />
            </div>
          </div>
        )}

        <button
          onClick={onConfirmPayment}
          disabled={isLoading || !!qrCodeUrl}
          className="mt-4 flex w-full items-center justify-center rounded-md bg-indigo-600 py-3 text-lg font-semibold text-white shadow-md transition duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isLoading ? 'Processing...' : 'Confirm Payment'}
        </button>
        {(!qrCodeUrl)&&<button 
        className="mt-4 flex w-full items-center justify-center rounded-md bg-red-600 py-3 text-lg font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
          onClick={handelcancelBooking}
          >Cancel</button>}
      </div>
    );
  };

  export default QRCodePayment;
