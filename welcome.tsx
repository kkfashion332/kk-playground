import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// Old logo reference replaced with new gold logo path
import logo from "@/assets/kk-logo-gold.png";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — K_K PLAYGROUND" },
      { name: "description", content: "Welcome to K_K Playground Free Fire tournament arena." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<{ ffName: string; ffId: string } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("kk_player");
    if (!raw) { navigate({ to: "/" }); return; }
    try { setPlayer(JSON.parse(raw)); } catch { navigate({ to: "/" }); }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("kk_player");
    navigate({ to: "/" });
  }

  if (!player) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[40rem] rounded-full bg-gold/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md text-center">
        {/* New gold logo is now dynamic based on the import */}
        <img src={logo} alt="K_K Playground logo" className="h-28 w-28 object-contain mx-auto animate-glow rounded-full" />
        <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-deep font-semibold">Welcome to</p>
        <h1 className="mt-2 text-4xl font-bold tracking-widest text-gold-gradient">K_K PLAYGROUND</h1>
        <div className="mx-auto mt-3 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="mt-8 rounded-2xl bg-card/80 backdrop-blur-xl p-6 ring-gold shadow-gold text-left">
          <p className="text-xs uppercase tracking-wider text-gold mb-1">Player</p>
          <p className="text-xl font-semibold text-foreground break-words">{player.ffName}</p>
          <div className="my-4 h-px bg-border" />
          <p className="text-xs uppercase tracking-wider text-gold mb-1">Free Fire ID</p>
          <p className="text-lg font-mono text-foreground tracking-wider">{player.ffId}</p>
        </div>

        <button onClick={handleLogout}
          className="mt-6 text-sm text-muted-foreground hover:text-gold transition underline-offset-4 hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
}
