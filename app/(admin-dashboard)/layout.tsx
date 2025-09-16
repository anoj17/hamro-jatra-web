import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminNavbar } from "@/components/admin-navbar";
import { auth } from "@/auth";
import { SessionProps } from "@/types";
import MainComponent from "@/layout/main-component";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as SessionProps;

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <AdminNavbar session={session} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <AdminSidebar session={session} />

        <MainComponent session={session}>
          <main className={`flex-1 overflow-scroll scrollbar-none`}>
            <div className="lg:pl-5">{children}</div>
          </main>
        </MainComponent>
      </div>
    </div>
  );
}
