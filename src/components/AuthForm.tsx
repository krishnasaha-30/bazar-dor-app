"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "signin" | "signup";
  callbackURL: string;
};

export default function AuthForm({ mode, callbackURL }: AuthFormProps) {
  const isSignUp = mode === "signup";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    if (isSignUp && name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        toast.error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি।");
        return;
      }

      if (isSignUp) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন লগ ইন করুন।");
        router.push(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
      } else {
        toast.success("সফলভাবে লগ ইন হয়েছে।");
        router.push(callbackURL);
      }
      router.refresh();
    } catch (error) {
      console.error("Authentication request failed", error);
      toast.error("অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setIsSubmitting(true);
    try {
      window.localStorage.setItem("auth:social-login-pending", "true");
      const result = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}${callbackURL}`,
      });

      if (result.error) {
        window.localStorage.removeItem("auth:social-login-pending");
        toast.error(
          result.error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে লগ ইন করা যায়নি।`,
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      window.localStorage.removeItem("auth:social-login-pending");
      console.error(`${provider} authentication failed`, error);
      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে লগ ইন করা যায়নি।`,
      );
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[60vh] bg-base-200 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-success sm:text-3xl">
            {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "আপনার অ্যাকাউন্টে লগ ইন করুন"}
          </h1>
          <p className="mt-2 text-sm text-base-content/65">
            {isSignUp
              ? "বাজার দর-এ যোগ দিতে তথ্যগুলো পূরণ করুন।"
              : "আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন।"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {isSignUp && (
            <label className="form-control w-full gap-1.5">
              <span className="label-text font-medium">নাম</span>
              <input
                autoComplete="name"
                className="input input-bordered w-full"
                maxLength={100}
                minLength={2}
                name="name"
                placeholder="আপনার নাম"
                required
              />
            </label>
          )}

          <label className="form-control w-full gap-1.5">
            <span className="label-text font-medium">ইমেইল</span>
            <input
              autoComplete="email"
              className="input input-bordered w-full"
              name="email"
              placeholder="name@example.com"
              required
              type="email"
            />
          </label>

          <label className="form-control w-full gap-1.5">
            <span className="label-text font-medium">পাসওয়ার্ড</span>
            <input
              autoComplete={isSignUp ? "new-password" : "current-password"}
              className="input input-bordered w-full"
              minLength={8}
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              type="password"
            />
          </label>

          <button
            className="btn btn-success w-full text-white mt-4"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm" aria-label="অপেক্ষা করুন" />
            ) : isSignUp ? (
              "সাইন আপ"
            ) : (
              "সাইন ইন"
            )}
          </button>
        </form>

        <div className="divider my-5 text-xs text-base-content/50">অথবা</div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="btn btn-outline"
            disabled={isSubmitting}
            onClick={() => handleSocialSignIn("google")}
            type="button"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            className="btn btn-outline"
            disabled={isSubmitting}
            onClick={() => handleSocialSignIn("github")}
            type="button"
          >
            <GitHubIcon />
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-base-content/70">
          {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link
            className="font-semibold text-success underline-offset-4 hover:underline"
            href={`${isSignUp ? "/signin" : "/signup"}?callbackURL=${encodeURIComponent(callbackURL)}`}
          >
            {isSignUp ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.9-1.75 2.98-4.33 2.98-7.37Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.4l-3.24-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84v-2.6H3.06a10 10 0 0 0 0 9.04l3.35-2.6Z" />
      <path fill="#EA4335" d="M12 5.96c1.47 0 2.8.5 3.84 1.5l2.88-2.88A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.94 5.48l3.35 2.6C7.2 7.72 9.4 5.96 12 5.96Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="size-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.64-1.24-1.64-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.69 2.13 3.33 1.51.1-.73.39-1.23.7-1.51-2.48-.28-5.08-1.24-5.08-5.53 0-1.22.44-2.22 1.15-3-.11-.28-.5-1.43.11-2.98 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.04-1.14 3.04-1.14.61 1.55.23 2.7.12 2.98.71.78 1.14 1.78 1.14 3 0 4.3-2.61 5.25-5.1 5.53.4.34.75 1 .75 2.01v2.99c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}
