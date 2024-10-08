"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAsVenu(id: number, status: boolean) {
  const supabase = createClient();
  await supabase.from("bookings").update({ status: !status }).eq("id", id);
  revalidatePath("/dashboard");
}
