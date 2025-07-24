export const submitBooking = async (bookingData: any, authToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // ส่ง token ไปด้วย
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to submit booking');
    }

    return await res.json();
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
};

export async function cancelBooking( userAuthToken:string) {
await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/cancelBooking`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${userAuthToken}`,
    "Accept": "application/json"
  },
});
}

export async function bookRoomApi({
  token,
  roomId,
  checkIn,
  checkOut,
}: {
  token: string;
  roomId: number;
  checkIn: string;
  checkOut: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/blocked_room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        message: data?.message || "Booking failed",
      };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
}

export const fetchUserDataWithToken = async (authToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user_infomation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch user data with token');
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user data with token:", error);
    throw error;
  }
};

export const fetchBooking = async ()=>{
  try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking`, {
      method: 'GET',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch data booking');
    }
    return await res.json();
  }catch(error) {
    console.error("Error fetch booking:", error);
    throw error;
  }
}

export const fetchInfoAdmin = async ()=>{
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking/infoAdmin`,{
      method: 'GET',
    })
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch Infomation');
    }
    return await res.json();
    
  }catch(error){
    console.error("Error fetch Infomation for Admin",error)
  }
}



export const updateReservationStatus = async (id: string,status:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking/update-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update reservation status');
    }

    return await res.json();
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw error;
  }
};

export const updatePaymentAmount = async (id: string, amount: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking/update-paid`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, amount }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update payment');
    }

    return await res.json(); // { paid_amount, status_reservation }
  } catch (err) {
    console.error('Error updating payment:', err);
    throw err;
  }
};

// services/bookingService.ts
export const deleteOrCancelBookingById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking/deleteOrCancel/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete or cancel booking');
  }

  return res.json();
};

