import { signOutAction } from "@/app/actions";
import { SubmitButton } from "./submit-button";
import { PenLine } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-[90rem] mx-auto py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-extrabold uppercase tracking-tight font-jockey flex items-center gap-x-3">
            Booking
            <PenLine size={28} className="text-red-600"/>
          </h1>
          <form>
            <SubmitButton
              pendingText="Logging out..."
              formAction={signOutAction}
              className="bg-red-500 hover:bg-red-600"
            >
              Log out
            </SubmitButton>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
