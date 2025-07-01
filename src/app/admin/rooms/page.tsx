import NavBarAdmin from "@/components/AdminPage/NavBarAdmin";
import CardDetail from "@/components/card/CardDetailAdmin";
import { CardMetric } from "@/types/types";
import RoomTable from "@/components/AdminPage/RoomTable";

const AdminRoom: React.FC = () => {
  const totalRooms = 48; // Example static value
  const totalBookings = 156; // Example static value
  const occupancyRate = 78; // Example static value (as a percentage)
  const revenue = 24560; // Example static value
  const cardMetrics: CardMetric[] = [
    {
      title: 'Total Rooms',
      value: totalRooms,
      icon: "w",
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: "w",
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      icon: "w",
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'Revenue',
      value: `฿${revenue.toLocaleString()}`,
      icon: "w",
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
  ];
    return (
    <>
      <NavBarAdmin />
      <section className=" px-12 min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-12 w-full max-w-7xl pt-10">
          {cardMetrics.map((metric) => (
            <CardDetail key={metric.title} metric={metric} />
          ))}
        </div>
        <div className="w-full px-4 py-12">
        <RoomTable />
        </div>
      </section>
    </>
  );
};

export default AdminRoom;