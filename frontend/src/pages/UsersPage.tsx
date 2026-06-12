import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import { api } from "@/lib/api";

interface User {
  id: number;
  name: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  async function loadUsers() {
    try {
      const response = await api.get("/users");

      const usersList = response.data.users || response.data.data?.users || [];

      setUsers(usersList);
    } catch (error) {
      console.error("ERRO AO BUSCAR USERS:", error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreateUser() {
    if (!newName.trim()) {
      alert("Digite um nome");
      return;
    }

    try {
      await api.post("/users", {
        name: newName.trim(),
      });

      setNewName("");
      await loadUsers();
    } catch (error) {
      console.error("ERRO AO CRIAR USER:", error);
      alert("Erro ao criar usuário. Veja o Console.");
    }
  }

  async function handleDeleteUser(id: number) {
    try {
      await api.delete(`/users/${id}`);
      await loadUsers();
    } catch (error) {
      console.error("ERRO AO DELETAR USER:", error);
      alert("Erro ao deletar usuário. Veja o Console.");
    }
  }

  function startEdit(user: User) {
    setEditingUserId(user.id);
    setEditingName(user.name);
  }

  function cancelEdit() {
    setEditingUserId(null);
    setEditingName("");
  }

  async function handleUpdateUser(id: number) {
    if (!editingName.trim()) {
      alert("Digite um nome");
      return;
    }

    try {
      await api.put(`/users/${id}`, {
        name: editingName.trim(),
      });

      setEditingUserId(null);
      setEditingName("");
      await loadUsers();
    } catch (error) {
      console.error("ERRO AO ATUALIZAR USER:", error);
      alert("Erro ao atualizar usuário. Veja o Console.");
    }
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-slate-400">Manage API users</p>
      </div>

      <main className="p-8">
        <div className="mb-6 flex gap-3">
          <input
            className="w-full max-w-sm rounded border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none"
            placeholder="User name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />

          <button
            type="button"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            onClick={handleCreateUser}
          >
            Add User
          </button>
        </div>

        <div className="mb-4">
          <input
            className="w-full max-w-sm rounded border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800">
                  <td className="p-4">{user.id}</td>

                  <td className="p-4">
                    {editingUserId === user.id ? (
                      <input
                        className="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none"
                        value={editingName}
                        onChange={(event) =>
                          setEditingName(event.target.value)
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>

                  <td className="p-4 text-right">
                    {editingUserId === user.id ? (
                      <>
                        <button
                          type="button"
                          className="mr-2 rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700"
                          onClick={() => handleUpdateUser(user.id)}
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          className="mr-2 rounded bg-slate-600 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-500"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="mr-2 rounded bg-slate-700 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-slate-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardLayout>
  );
}