import Link from "next/link";

const WelcomeText = ({ username }: { username: string }) => {
  return (
    <div className="lg:py-10 py-5 flex items-center justify-between">
      <h1 className="font-[500] text-[24px] lg:text-3xl font-jockey text-black/90">
        Bon Retour <span className="capitalize">{username} 👋</span>
      </h1>
      {(username === "hannan" || username === "adam") && (
        <Link href={"/dashboard/deleted"} className="underline text-sm">
          Pour Admin
        </Link>
      )}
    </div>
  );
};

export default WelcomeText;
