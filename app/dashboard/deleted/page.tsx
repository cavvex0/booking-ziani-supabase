import DeletedPage from "@/sections/DeletedPage";
import WelcomeText from "@/components/WelcomeText";
import { getUsername } from "@/lib/getUsername";
import { createClient } from "@/utils/supabase/server";

async function Deleted() {
  const username = await getUsername();
  const supabase = createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("deleted", true)
    .order("datee", { ascending: true });

  if (!data) {
    return null;
  }
  return (
    <div className="max-w-[90rem] mx-auto px-4 xl:px-6">
      <WelcomeText username={username} />
      <DeletedPage bookings={data} />
    </div>
  );
}
export default Deleted;
