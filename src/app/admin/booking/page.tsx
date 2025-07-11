
'use client'
import NavBarAdmin from "@/components/AdminPage/NavBarAdmin";
import CardDetail from "@/components/card/CardDetailAdmin";
import { CardMetric } from "@/types/types";
import BookingTable from "@/components/AdminPage/BookingTable";
import AdminGuard from "@/components/auth/AdminGuard";
import { useState,useEffect } from "react";
import { RoomDetailAdmin } from "@/types/types";
import { fetchInfoAdmin } from "@/services/booking";
const AdminBooking: React.FC = () => {
   const [cardMetrics, setCardMetrics] = useState<CardMetric[]>([]);
  
       useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchInfoAdmin(); // สมมุติว่าได้ข้อมูลจาก backend

        const {
          totalBooking,
          totalRooms,
          occupancyRate,
          pendingCount,
          revenue,
        } = data;

        const metrics: CardMetric[] = [
          {
            title: 'Total Rooms',
            value: totalRooms,
            icon: 'R',
            bgColor: 'bg-indigo-100',
            textColor: 'text-indigo-600',
          },
          {
            title: 'Total Bookings',
            value: totalBooking,
            icon: 'B',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
          },
          {
            title: 'Occupancy Rate',
            value: occupancyRate,
            icon: '%',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-600',
          },
          {
            title: 'Pending',
            value: pendingCount,
            icon: 'p',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-600',
          },
          {
            title: 'Revenue',
            value: `฿${Number(revenue).toLocaleString()}`,
            icon: 'R',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-600',
          },
        ];

        setCardMetrics(metrics);
      } catch (error) {
        console.error('Failed to fetch admin info:', error);
      }
    };

    fetch();
  }, []);


    return (
    <>
    <AdminGuard>
      <NavBarAdmin />
      <section className=" px-8 min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-5 lg:gap-12 w-full max-w-7xl pt-10">
          {cardMetrics.map((metric) => (
            <CardDetail key={metric.title} metric={metric} />
          ))}
        </div>
        <div className="w-full px-4 py-12">
        <BookingTable />
        </div>
      </section>
    </AdminGuard>
    </>
  );
};

export default AdminBooking;
