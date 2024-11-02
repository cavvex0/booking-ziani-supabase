import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Login = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user.data.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="lg:h-screen h-[55vh] w-screen grid place-items-center">
      <form className="flex flex-col gap-4 w-full lg:w-[400px] p-6 border py-14 bg-white">
        <Input
          placeholder="username"
          name="username"
          className="focus-visible:ring-blue-700"
        />
        <Input
          placeholder="password"
          name="password"
          type="password"
          className="focus-visible:ring-blue-700"
        />
        <SubmitButton
          pendingText="Signing in..."
          formAction={signInAction}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
};

export default Login;
