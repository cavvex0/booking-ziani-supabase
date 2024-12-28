"use server";

import { EditBookingSchemaType } from "@/schema/bookings";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function editeBooking(values: EditBookingSchemaType) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const username = user.user_metadata.username;

  if (
    username !== "hannan" &&
    username !== "soraya" &&
    username !== values.createdBy
  ) {
    return new Error("Vous n'êtes pas autorisé à modifier cette réservation");
  }
  const { data } = await supabase
    .from("bookings")
    .update(values)
    .eq("id", values.id);
  revalidatePath("/dashboard");
  return data;
}
