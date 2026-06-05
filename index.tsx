import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
// Image yahan se load hogi
import kkLogo from "@/assets/kk-logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K_K Playground — Free Fire Tournaments" },
      { name: "description", content: "Login to K_K Playground and join premium Free Fire tournaments." },
      { property: "og:title", content: "K_K Playground — Free Fire Tournaments" },
      { property: "og:description", content: "Premium Free Fire tournament arena. Login with your FF name and ID." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [ffName, setFfName] = useState("");
  const [ffId, setFfId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ffName.trim() || !ffId.trim()) {
      toast.error("Please fill in both fields");
      return;
    }
    if (!/^\d{6,12}$/.test(ffId.trim())) {
      toast.error("Free Fire ID must be 6–12 digits");
      return;
    }
    setLoading(true);
    
    // 🔥 Jab Firebase connect karna ho, in lines ka comment hata dena:
    // import { db } from "@/firebase";
    // import { addDoc, collection, serverTimestamp } from "firebase/firestore";
    // await addDoc(collection(db, "players"), {
    //   ffName: ffName.trim(),
    //   ffId: ffId.trim(),
    //   createdAt: serverTimestamp(),
    // });
    
    await new Promise((r) => setTimeout(r, 600)); // Fake delay for animation
    setLoading(false);
    toast.success(`Welcome, ${ffName}!`, { description: "K_K PLAYGROUND" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-radial">
      <Toaster theme="dark" position="top-center" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_82/0.18),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.12_70/0.18),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-10">
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-20 blur-2xl" />
            <img
              src={kkLogo}
              alt="K_K Playground premium gold logo"
              className="relative h-36 w-36 rounded-2xl object-cover shadow-gold ring-1 ring-[color:var(--gold)]/40"
            />
          </div>
          <h1 className="font-display mt-6 text-center text-3xl font-bold uppercase tracking-[0.25em] text-gradient-gold">
            K_K Playground
          </h1>
          <p className="mt-2 text-center text-xs uppercase tracking-[0.4em] text-[color:var(--gold-deep)]">
            Free Fire Arena
          </p>
        </div>

        <section className="w-full rounded-2xl border border-[color:var(--gold)]/25 bg-card/80 p-7 shadow-elegant backdrop-blur-xl">
          <header className="mb-6 text-center">
            <h2 className="font-display text-xl uppercase tracking-widest text-gradient-gold">
              Welcome
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Login to K_K Playground</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label htmlFor="ffName" className="mb-2 block text-xs font-medium uppercase tracking-widest text-[color:var(--gold-soft)]">
                Free Fire Name
              </label>
              <input
                id="ffName"
                type="text"
                value={ffName}
                onChange={(e) => setFfName(e.target.value)}
                placeholder="Enter your in-game name"
                maxLength={32}
                className="w-full rounded-lg border border-[color:var(--gold)]/25 bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
              />
            </div>

            <div>
              <label htmlFor="ffId" className="mb-2 block text-xs font-medium uppercase tracking-widest text-[color:var(--gold-soft)]">
                Free Fire ID
              </label>
              <input
                id="ffId"
                type="text"
                inputMode="numeric"
                value={ffId}
                onChange={(e) => setFfId(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 1234567890"
                maxLength={12}
                className="w-full rounded-lg border border-[color:var(--gold)]/25 bg-input/60 px-4 py-3 font-mono tracking-wider text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-gold px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-gold transition active:scale-[0.98] disabled:opacity-70"
            >
              <span className="relative z-10">{loading ? "Entering..." : "Enter Arena"}</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-3 text-[color:var(--gold-deep)]">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[color:var(--gold)]/60" />
            <span className="text-xs">◆</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[color:var(--gold)]/60" />
          </div>

          <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
            Premium Tournament Access
          </p>
        </section>

        <footer className="mt-8 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
          © K_K Playground
        </footer>
      </div>
    </main>
  );
}
