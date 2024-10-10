import BookingTable from "@/components/BookingTable";
import WelcomeText from "@/components/WelcomeText";
import { getUsername } from "@/lib/getUsername";
import { createClient } from "@/utils/supabase/server";

const Dashboard = async () => {
  const username = await getUsername();
  const supabase = createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .neq("deleted", true);

  if (!bookings) {
    return null;
  }

  return (
    <div className="max-w-[90rem] mx-auto px-4 xl:px-6">
      <WelcomeText username={username} />
      <BookingTable bookings={bookings} />
    </div>
  );
};

export default Dashboard;
