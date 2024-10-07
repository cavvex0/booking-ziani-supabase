import BookingTable from "@/components/BookingTable";
import { getUsername } from "@/lib/getUsername";
import { createClient } from "@/utils/supabase/server";

const Dashboard = async () => {
  const supabase = createClient();
  const username = await getUsername();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true });

  if (!bookings) {
    // Handle the case where bookings is null
    return <div>No bookings found</div>;
  }
  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="py-10">
        <h1 className="font-bold text-3xl font-jockey">
          Bon Retour <span className="capitalize">{username} 👋</span>
        </h1>
      </div>
      <BookingTable bookings={bookings} />
    </div>
  );
};

export default Dashboard;
