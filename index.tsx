import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
// Old logo reference replaced with new gold logo path
import logo from "@/assets/kk-logo-gold.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K_K PLAYGROUND — Free Fire Tournaments" },
      { name: "description", content: "Join premium Free Fire tournaments at K_K Playground." },
      { property: "og:title", content: "K_K PLAYGROUND — Free Fire Tournaments" },
      { property: "og:description", content: "Premium Free Fire tournament arena." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [ffName, setFfName] = useState("");
  const [ffId, setFfId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!ffName.trim()) return setError("Free Fire name daalein");
    if (!/^\d{6,12}$/.test(ffId.trim())) return setError("Sahi Free Fire ID daalein (6-12 digits)");
    setLoading(true);
    localStorage.setItem("kk_player", JSON.stringify({ ffName: ffName.trim(), ffId: ffId.trim() }));
    setTimeout(() => { setLoading(false); navigate({ to: "/welcome" }); }, 600);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold-deep/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="relative animate-glow">
            {/* New gold logo is now dynamic based on the import */}
            <img src={logo} alt="K_K Playground premium gold logo" className="h-40 w-40 object-contain drop-shadow-2xl rounded-full" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-widest text-gold-gradient text-center">K_K PLAYGROUND</h1>
          <div className="mt-2 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">Free Fire Tournaments</p>
        </div>

        <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl p-8 ring-gold shadow-gold">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-light to-transparent" />
          <h2 className="text-xl font-semibold text-foreground text-center mb-1">Player Login</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Apni Free Fire details daalein</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="ffName" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-2">Free Fire Name</label>
              <input id="ffName" type="text" value={ffName} onChange={(e) => setFfName(e.target.value)}
                placeholder="e.g. K_K•PRO" maxLength={30}
                className="w-full rounded-lg bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition" />
            </div>
            <div>
              <label htmlFor="ffId" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-2">Free Fire ID</label>
              <input id="ffId" type="text" inputMode="numeric" value={ffId}
                onChange={(e) => setFfId(e.target.value.replace(/\D/g, ""))}
                placeholder="123456789" maxLength={12}
                className="w-full rounded-lg bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition tracking-wider" />
            </div>
            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">{error}</p>
            )}
            <button type="submit" disabled={loading}
              className="relative w-full overflow-hidden rounded-lg bg-gold-gradient px-6 py-3.5 font-bold text-primary-foreground tracking-wide uppercase text-sm shadow-gold transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
              <span className="relative z-10">{loading ? "Entering Arena..." : "Enter Tournament"}</span>
              <span className="absolute inset-0 animate-shimmer" />
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">By continuing you agree to the K_K Playground fair-play rules.</p>
        </div>
      </div>
    </div>
  );
}

