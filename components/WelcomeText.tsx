import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const WelcomeText = async ({ username }: { username: string }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("deleted", true);

  if (!data) {
    return null;
  }
  return (
    <div className="lg:py-10 py-5 flex items-center justify-between">
      <h1 className="font-[500] text-[24px] lg:text-3xl font-jockey text-black/90">
        Bon Retour <span className="capitalize">{username} 👋</span>
      </h1>
      {(username === "hannan" || username === "adam") && (
        <div className="relative">
          {data.length > 1 && (
            <div className="size-5 bg-red-500 rounded-full flex items-center justify-center absolute -top-3 -right-2">
              <span className="text-[12px] font-semibold text-white">
                {data.length}
              </span>
            </div>
          )}
          <Link href={"/dashboard/deleted"} className="underline text-sm">
            Pour Admin
          </Link>
        </div>
      )}
    </div>
  );
};

export default WelcomeText;
