"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!session?.user) return;

    try {
      if (window.localStorage.getItem("auth:social-login-pending") === "true") {
        window.localStorage.removeItem("auth:social-login-pending");
        toast.success("সফলভাবে লগ ইন হয়েছে।");
      }
    } catch {
      toast.error("লগ ইন সম্পন্ন হয়েছে, তবে বিজ্ঞপ্তি দেখানো যায়নি।");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex w-full justify-end gap-2 sm:w-auto sm:gap-3" aria-label="অ্যাকাউন্ট লোড হচ্ছে">
        <span className="skeleton h-9 w-20 sm:h-10" />
        <span className="skeleton h-9 w-20 sm:h-10" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
        <span className="hidden max-w-40 truncate text-sm text-base-content/70 sm:inline">
          {session.user.name}
        </span>
        <button
          type="button"
          className="btn btn-outline btn-success btn-sm sm:btn-md"
          onClick={async () => {
            try {
              const result = await authClient.signOut();
              if (result.error) {
                toast.error(result.error.message || "লগ আউট করা যায়নি।");
                return;
              }
              toast.success("সফলভাবে লগ আউট হয়েছে।");
              router.refresh();
            } catch (error) {
              console.error("Logout request failed", error);
              toast.error("লগ আউট করা যায়নি। আবার চেষ্টা করুন।");
            }
          }}
        >
          লগ আউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-end gap-2 sm:w-auto sm:gap-3">
      <Link href="/signin" className="btn btn-outline btn-success btn-sm sm:btn-md">
        সাইন ইন
      </Link>
      <Link href="/signup" className="btn btn-active rounded-2 bg-green-500 text-white btn-success btn-sm sm:btn-md">
        সাইন আপ
      </Link>
    </div>
  );
}
