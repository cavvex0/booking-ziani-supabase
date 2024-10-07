import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <form className="flex flex-col gap-4 w-[400px]">
        <Input placeholder="username" name="username" />
        <Input placeholder="password" name="password" type="password" />
        <SubmitButton pendingText="Signing in..." formAction={signInAction}>
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
};

export default Login;
