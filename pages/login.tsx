import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiArrowRightLine, RiKeyLine, RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import AwneyLogo from "@/components/brand/AwneyLogo";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.ok) router.replace("/");
    else setError("Incorrect email or password.");
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, inviteCode }),
    });

    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? "Something went wrong.");
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (signInRes?.ok) router.replace("/");
    else {
      setError("Account created but sign-in failed. Try signing in manually.");
      switchMode("signin");
    }
  }

  return (
    <>
      <Head>
        <title>Sign in — Awney Growth OS</title>
        <meta name="description" content="Awney Growth OS — acquisition and conversion in one workspace." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-[#071a2f] lg:grid lg:grid-cols-[1.12fr_0.88fr]">
        <section className="relative hidden min-h-screen overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,110,245,0.42),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(20,110,245,0.16),transparent_30%)]" />
          <div className="absolute -bottom-36 -right-28 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border border-white/10" />

          <AwneyLogo inverse className="relative z-10" />

          <div className="relative z-10 max-w-xl">
            <span className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold tracking-[0.16em] text-white/70 backdrop-blur">
              ACQUISITION + CONVERSION
            </span>
            <h1 className="text-5xl font-extrabold leading-[1.06] tracking-[-0.055em] text-white xl:text-6xl">
              Turn outreach into a growth system.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/62">
              Manage prospects, campaigns and conversations from one focused workspace built for the Awney team.
            </p>
          </div>

          <p className="relative z-10 text-xs font-medium tracking-wide text-white/35">
            AWNEY DIGITAL · GROWTH OS
          </p>
        </section>

        <section className="relative flex min-h-screen items-center justify-center bg-[#f7f9fc] px-6 py-12 sm:px-10">
          <div className="absolute left-0 top-0 h-1 w-full bg-primary lg:hidden" />
          <div className="w-full max-w-md">
            <AwneyLogo className="mb-12 lg:hidden" />

            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {mode === "signin" ? "Welcome back" : "Join the workspace"}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-base-content">
                {mode === "signin" ? "Sign in to Awney" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm text-base-content/55">
                {mode === "signin"
                  ? "Access your campaigns and conversations."
                  : "Use the invitation code provided by your administrator."}
              </p>
            </div>

            <div className="mb-5 flex rounded-full border border-base-300 bg-white p-1 shadow-[0_6px_24px_rgba(7,26,47,0.05)]">
              {(["signin", "signup"] as Mode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => switchMode(item)}
                  className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
                    mode === item
                      ? "bg-[#071a2f] text-white shadow-sm"
                      : "text-base-content/45 hover:text-base-content"
                  }`}
                >
                  {item === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <form
              onSubmit={mode === "signin" ? handleSignIn : handleSignUp}
              className="flex flex-col gap-5 rounded-3xl border border-base-300/90 bg-white p-7 shadow-[0_20px_60px_rgba(7,26,47,0.08)] sm:p-8"
            >
              <Field label="Email" icon={<RiMailLine size={17} />}>
                <input
                  type="email"
                  className="input h-12 w-full border-base-300 bg-base-100 pl-10 focus:outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
              </Field>

              <Field label="Password" icon={<RiLockPasswordLine size={17} />}>
                <input
                  type="password"
                  className="input h-12 w-full border-base-300 bg-base-100 pl-10 focus:outline-none"
                  placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              {mode === "signup" && (
                <Field label="Invite code" icon={<RiKeyLine size={17} />}>
                  <input
                    type="password"
                    className="input h-12 w-full border-base-300 bg-base-100 pl-10 focus:outline-none"
                    placeholder="Provided by your administrator"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    required
                  />
                </Field>
              )}

              {error && (
                <p role="alert" className="rounded-xl border border-error/15 bg-error/5 px-3.5 py-3 text-xs font-medium text-error">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn btn-primary mt-1 h-12 w-full">
                {loading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <span className="flex items-center gap-2">
                    {mode === "signin" ? "Enter workspace" : "Create account"}
                    <RiArrowRightLine size={16} />
                  </span>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-base-content/35">
              Awney Growth OS · Secure team access
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-base-content/45">{label}</span>
      <span className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-base-content/30">
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}
