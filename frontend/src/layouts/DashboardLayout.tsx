import { Link } from "react-router-dom";
import { LogOut, Server, Users } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
        <h1 className="text-xl font-bold">BiaoTech</h1>
        <p className="text-sm text-slate-400">Admin Panel</p>

        <nav className="mt-8 space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <Server size={18} /> Dashboard
          </Link>

          <Link
            to="/users"
            className="flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <Users size={18} /> Users
          </Link>
        </nav>

        <Button
          className="mt-10 w-full border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          variant="outline"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}