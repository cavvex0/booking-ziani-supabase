"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAsDelete(id: number, createdBy: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const username = user.user_metadata.username;

  if (
    username !== "hannan" &&
    username !== "soraya" &&
    username !== createdBy
  ) {
    return new Error("Vous n'êtes pas autorisé à supprimer cette réservation");
  }
  await supabase.from("bookings").update({ deleted: true }).eq("id", id);

  revalidatePath("/dashboard");
}
