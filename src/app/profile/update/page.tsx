import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "প্রোফাইল তথ্য আপডেট | বাজার দর",
};

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile%2Fupdate");
  }

  return (
    <main className="min-h-[60vh] bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          className="mb-5 inline-flex text-sm text-green-800 hover:underline"
          href="/profile"
        >
          ← আমার প্রোফাইলে ফিরে যান
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          প্রোফাইল তথ্য আপডেট
        </h1>
        <UpdateProfileForm initialName={session.user.name} />
      </div>
    </main>
  );
}
