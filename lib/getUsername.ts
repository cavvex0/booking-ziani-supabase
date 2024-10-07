import { createClient } from "@/utils/supabase/server";

export const getUsername = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.user_metadata?.username || null;
};
