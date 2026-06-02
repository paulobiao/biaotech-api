import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { api } from "@/lib/api";

interface User {
  id: number;
  name: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/users").then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-slate-400">Manage API users</p>
      </div>

      <main className="p-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-800">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardLayout>
  );
}