
import NavBarAdmin from "@/components/AdminPage/NavBarAdmin";
import CardDetail from "@/components/card/CardDetailAdmin";
import { CardMetric } from "@/types/types";
import BookingTable from "@/components/AdminPage/BookingTable";
import AdminGuard from "@/components/auth/AdminGuard";
const AdminBooking: React.FC = () => {
 const totalBookings = 48; // Example static value
  const confirmed = 156; // Example static value
  const pending = 78; // Example static value (as a percentage)
  const cancelled = 8; // Example static value
  const Revenue = 24560; // Example static value
  const cardMetrics: CardMetric[] = [
    {
      title: 'Total Rooms',
      value: totalBookings,
      icon: "w",
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
    {
      title: 'Total Bookings',
      value: confirmed,
      icon: "w",
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Occupancy Rate',
      value: `${cancelled}`,
      icon: "w",
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'pending',
      value: `${pending}`,
      icon: "w",
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },{
      title: 'Revenue',
      value: `฿${Revenue.toLocaleString()}`,
      icon: "w",
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
  ];
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
