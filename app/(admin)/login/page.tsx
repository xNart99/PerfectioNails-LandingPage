"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

/** Admin login page — simple email/password form. */
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-cream-warm flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-script text-[44px] text-ink leading-none">
            Perfectio<span className="text-gold-deep">nails</span>
          </div>
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink-faint mt-2">
            Admin — Journal Manager
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream border border-rule p-8 flex flex-col gap-5">
          <div>
            <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors"
            />
          </div>

          {error && (
            <p className="font-sans text-[13px] text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-ink bg-ink text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
