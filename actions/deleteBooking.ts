"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteBooking(id: number) {
  const supabase = createClient();
  await supabase.from("bookings").delete().eq("id", id);
  revalidatePath("/dashboard");
}
