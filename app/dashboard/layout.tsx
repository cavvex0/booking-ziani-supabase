import Header from "@/components/Header";
import ClickProvider from "@/providers/ClickContext";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <ClickProvider>{children}</ClickProvider>
    </div>
  );
};

export default DashLayout;
