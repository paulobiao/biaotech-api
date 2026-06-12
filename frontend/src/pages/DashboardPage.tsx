import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import { api } from "@/lib/api";

type HealthData = {
  status: string;
  database: string;
  environment?: string;
};

export default function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [usersResponse, healthResponse] = await Promise.all([
          api.get("/users"),
          api.get("/health"),
        ]);

        setTotalUsers(usersResponse.data.users.length);
        setHealth(healthResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <h1 className="text-2xl font-bold">BiaoTech Admin Dashboard</h1>
        <p className="text-sm text-slate-400">
          Production API Control Panel
        </p>
      </div>

      <main className="p-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Users</p>
            <h2 className="mt-2 text-2xl font-bold text-green-400">
              {totalUsers}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">API Status</p>
            <h2 className="mt-2 text-2xl font-bold text-green-400">
              {health?.status === "ok" ? "Online" : "Offline"}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Database</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-400">
              {health?.database ?? "Loading..."}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Environment</p>
            <h2 className="mt-2 text-2xl font-bold text-purple-400">
              {health?.environment ?? "Unknown"}
            </h2>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}