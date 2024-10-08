"use server";

import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(values: any) {
  const supabase = createClient();
  const { data } = await supabase.from("bookings").insert(values);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("push_token", null)
    .neq("id", user.id);

  if (error) {
    console.log(error);
    return;
  }
  profileData.forEach((profile) => {
    console.log(profile);
    sendPushNotification(
      profile.push_token,
      user.user_metadata.username,
      values
    );
  });
  revalidatePath("/dashboard");
  return data;
}
async function sendPushNotification(
  expoPushToken: string,
  username: string,
  booking: any
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: `${username.charAt(0).toUpperCase() + username.slice(1)} ajout d'une nouvelle réservation`,
    body: `Soin: ${booking.soin || "Vide!"} , Date: ${format(
      booking.date,
      "dd/MM/yyyy HH:mm"
    )}, Personnes: ${booking.people} , Details: ${booking.details || "Vide!"}`,
    data: { someData: "goes here" },
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(
        `Error sending push notification: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error sending push notification", error);
  }
}
