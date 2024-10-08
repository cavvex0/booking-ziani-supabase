"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAsDelete(id: number) {
  const supabase = createClient();
  await supabase.from("bookings").update({ deleted: true }).eq("id", id);

  revalidatePath("/dashboard");
}
