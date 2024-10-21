"use server";

import { EditBookingSchemaType } from "@/schema/bookings";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function editeBooking(values: EditBookingSchemaType) {
  const supabase = createClient();
  const { data } = await supabase
    .from("bookings")
    .update(values)
    .eq("id", values.id);
  revalidatePath("/dashboard");
  return data;
}
