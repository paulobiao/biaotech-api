import DashboardLayout from "@/layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <h1 className="text-2xl font-bold">BiaoTech Admin Dashboard</h1>
        <p className="text-sm text-slate-400">Production API Control Panel</p>
      </div>

      <main className="p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">API Status</p>
            <h2 className="mt-2 text-2xl font-bold text-green-400">Online</h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Database</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-400">Connected</h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Environment</p>
            <h2 className="mt-2 text-2xl font-bold text-purple-400">Production</h2>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}