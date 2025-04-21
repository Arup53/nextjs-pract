import DashboradContent from "@/components/admin/DashboardContent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <DashboradContent />
        <main className="flex justify-center items-center w-full">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
