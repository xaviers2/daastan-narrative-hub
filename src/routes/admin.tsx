import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, RefreshCw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Daastan Studio" },
      { name: "description", content: "Review discovery call requests sent to Daastan Studio." },
      { property: "og:title", content: "Admin Dashboard — Daastan Studio" },
      { property: "og:description", content: "Private dashboard for booking requests." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Booking = { id: string; name: string; email: string; phone: string; message: string; created_at: string };

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="min-h-screen" />;
  return session ? <Dashboard email={session.user.email ?? ""} /> : <Login />;
}

function Login() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    setBusy(false);
    if (error) setError("Incorrect email or password.");
  }
  const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-8 shadow-xl">
        <p className="text-xs tracking-[0.3em] text-primary">DAASTAN STUDIO</p>
        <h1 className="text-4xl">Admin sign in</h1>
        <input name="email" type="email" required placeholder="Email" className={field} />
        <input name="password" type="password" required placeholder="Password" className={field} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">← Back to site</Link>
      </form>
    </div>
  );
}

function Dashboard({ email }: { email: string }) {
  const [rows, setRows] = useState<Booking[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", u.user?.id ?? "").eq("role", "admin").maybeSingle();
    setIsAdmin(!!role);
    if (!role) return;
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete this request?")) return;
    await supabase.from("bookings").delete().eq("id", id);
    setRows((r) => r?.filter((x) => x.id !== id) ?? null);
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-sm font-semibold tracking-[0.3em]">DAASTAN STUDIO</Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-muted-foreground sm:inline">{email}</span>
            <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 rounded-full border border-foreground px-4 py-2 hover:bg-foreground hover:text-background"><LogOut className="h-4 w-4" /> Sign out</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Admin</p>
            <h1 className="text-5xl">Booking requests</h1>
          </div>
          <button onClick={load} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><RefreshCw className="h-4 w-4" /> Refresh</button>
        </div>
        {isAdmin === false && <p className="text-destructive">This account doesn't have admin access.</p>}
        {isAdmin && rows === null && <p className="text-muted-foreground">Loading…</p>}
        {rows?.length === 0 && <p className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">No requests yet.</p>}
        <div className="grid gap-4">
          {rows?.map((b) => (
            <div key={b.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl">{b.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-x-5 text-sm text-muted-foreground">
                    <a href={`mailto:${b.email}`} className="hover:text-primary">{b.email}</a>
                    <a href={`tel:${b.phone}`} className="hover:text-primary">{b.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</span>
                  <button aria-label="Delete" onClick={() => remove(b.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap leading-relaxed">{b.message}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
