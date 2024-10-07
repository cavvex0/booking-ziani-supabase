import BookingTable from "@/components/BookingTable";
import { getUsername } from "@/lib/getUsername";

const Dashboard = async () => {
  const username = await getUsername();

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="py-10">
        <h1 className="font-bold text-3xl font-jockey">
          Bon Retour <span className="capitalize">{username} 👋</span>
        </h1>
      </div>
      <BookingTable />
    </div>
  );
};

export default Dashboard;
