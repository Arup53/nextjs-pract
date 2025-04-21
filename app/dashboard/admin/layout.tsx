import DashboradContent from "@/components/admin/DashboardContent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboradContent />
      <main>{children}</main>
    </SidebarProvider>
  );
}
