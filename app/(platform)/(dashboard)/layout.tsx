import DashboardNavbar from "./_components/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full ">
      <DashboardNavbar />
      {children}
    </div>
  );
}
