import { signOutAction } from "@/app/actions";
import { SubmitButton } from "./submit-button";
import { PenLine } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-[90rem] mx-auto py-4 px-4 xl:px-6">
        <div className="flex items-center justify-between">
          <Link
            href={"/dashboard"}
            className="text-[20px] lg:text-[28px] font-extrabold uppercase tracking-tight font-jockey flex items-center gap-x-3 text-black/90"
          >
            Booking
            <PenLine className="text-red-600" />
          </Link>
          <form>
            <SubmitButton
              pendingText="Déconnexion..."
              formAction={signOutAction}
              className="bg-red-500 hover:bg-red-600 font-jockey text-[16px]"
            >
              Se déconnecter
            </SubmitButton>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
