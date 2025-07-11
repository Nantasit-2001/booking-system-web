// services/createQrPayment.ts

export async function createQrPayment({
  roomId,
  userAuthToken,
  checkInDate,
  checkOutDate,
  phoneNumber,
  specialRequests,
  totalPrice,
  deposit
}: {
  roomId: string;
  userAuthToken:string;
  checkInDate: string;
  checkOutDate: string;
  phoneNumber: string;
  specialRequests: string;
  totalPrice: number;
  deposit:number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${userAuthToken}`,
    },
    body: JSON.stringify({
      roomId,
      checkInDate,
      checkOutDate,
      phoneNumber,
      specialRequests,
      totalPrice,
      deposit,
    }),
  });

  if (!res.ok) throw new Error('Failed to create QR payment');

  return res.json();
}


export const checkPaymentStatus = async (chargeId: string,userAuthToken:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/status?chargeId=${chargeId}`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${userAuthToken}`,
    }
  })
    if (!res.ok) {
      throw new Error('Failed to check payment status');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('❌ checkPaymentStatus error:', error);
    throw error;
  }
};


