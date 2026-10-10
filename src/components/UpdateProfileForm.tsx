"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedName = name.trim();

    if (updatedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authClient.updateUser({ name: updatedName });

      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইলের তথ্য আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border border-[#e2e9e3] bg-white/80 p-4 sm:p-5">
      <h2 className="font-semibold text-slate-800">তথ্য</h2>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="form-control w-full gap-1.5">
            <span className="label-text text-sm font-medium">নাম</span>
            <input
              autoComplete="name"
              className="input input-bordered input-sm w-full bg-transparent"
              maxLength={100}
              minLength={2}
              name="name"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </label>
          <button
            className="btn btn-success btn-sm w-full text-white mt-5"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <span
                aria-label="অপেক্ষা করুন"
                className="loading loading-spinner loading-xs"
              />
            ) : (
              "আপডেট"
            )}
          </button>
      </form>
    </section>
  );
}
