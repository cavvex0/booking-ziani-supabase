import BookingTable from "@/components/BookingTable";
import { getUsername } from "@/lib/getUsername";
import { createClient } from "@/utils/supabase/server";

const Dashboard = async () => {
  const username = await getUsername();
  const supabase = createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true });

  if (!bookings) {
    return null;
  }

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="lg:py-10 py-5 px-4 xl:px-0">
        <h1 className="font-bold text-[24px] lg:text-3xl font-jockey text-black/90">
          Bon Retour <span className="capitalize">{username} 👋</span>
        </h1>
      </div>
      <BookingTable bookings={bookings} />
    </div>
  );
};

export default Dashboard;
