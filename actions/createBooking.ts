"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBooking(values: any) {
  const supabase = createClient();
  const { data } = await supabase.from("bookings").insert(values);
  revalidatePath("/dashboard");
  return data;
}
