import NavBarAdmin from "@/components/AdminPage/NavBarAdmin";
import CardDetail from "@/components/card/CardDetailAdmin";
import { CardMetric } from "@/types/types";
import RoomTable from "@/components/AdminPage/RoomTable";
import AdminGuard from "@/components/auth/AdminGuard";
const AdminRoom: React.FC = () => {
    return (
    <>
      <AdminGuard>
      <NavBarAdmin />
      <section className=" px-12 min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-full px-4 py-12">
        <RoomTable />
        </div>
      </section>
      </AdminGuard>
    </>
  );
};

export default AdminRoom;