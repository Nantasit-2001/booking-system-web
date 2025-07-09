import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { bookRoomApi } from "@/services/booking";

type BookingHandlerProps = {
  roomId: number;
  checkIn: string;
  checkOut: string;
  onResult: (result: { success: boolean; message?: string }) => void;
};

export const BookingHandler: React.FC<BookingHandlerProps> = ({
  roomId,
  checkIn,
  checkOut,
  onResult,
}) => {
  const { getToken, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    const handleBooking = async () => {
      if (!isSignedIn) {
        onResult({ success: false, message: "User not signed in" });
        return;
      }

      setLoading(true);
      const token = await getToken();
      if (!token) {
        onResult({ success: false, message: "No token found" });
        setLoading(false);
        return;
      }

      const result = await bookRoomApi({
        token,
        roomId,
        checkIn,
        checkOut,
      });

      onResult(result);
      setLoading(false);
    };

    handleBooking();
  }, [checkIn, checkOut]);

  return loading ? <p className="text-center pt-2">กำลังจอง...</p> : null;
};
