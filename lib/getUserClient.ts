"use client";
import { createClient } from "@/utils/supabase/client";

export const getUsername = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return user?.user_metadata?.username || null;
};
