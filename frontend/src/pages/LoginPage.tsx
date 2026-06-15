import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await login(email, password);

      setMessage("Login realizado com sucesso.");

      navigate("/dashboard");
    } catch (error: unknown) {
      console.log(error);

      setMessage("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <CardTitle className="text-3xl">BiaoTech Login</CardTitle>

          <CardDescription className="text-slate-400">
            Access the secure admin dashboard.
          </CardDescription>

          <p className="text-xs text-slate-500 mt-1">
            Demo: demo@biaotech.dev / demo1234
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                className="border-slate-700 bg-slate-950"
                placeholder="demo@biaotech.dev"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                className="border-slate-700 bg-slate-950"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            {message && (
              <p className="text-center text-sm text-slate-300">
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}