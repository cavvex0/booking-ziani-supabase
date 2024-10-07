import Header from "@/components/Header";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default DashLayout;
