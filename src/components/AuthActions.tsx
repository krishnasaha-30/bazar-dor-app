"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/UserAvatar";

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
      <details className="dropdown dropdown-end z-50">
          <summary className="btn btn-ghost h-auto min-h-0 gap-2 px-2 py-1.5 normal-case hover:bg-green-50">
            <UserAvatar image={session.user.image} name={session.user.name} />
            <span className="max-w-28 truncate text-sm font-medium sm:max-w-40">
              {session.user.name}
            </span>
            <svg
              aria-hidden="true"
              className="size-3 shrink-0"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="m3 4.5 3 3 3-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </summary>
          <ul className="menu dropdown-content mt-2 w-60 rounded-xl border border-base-200 bg-base-100 p-2 shadow-lg">
            <li className="pointer-events-none mb-1 border-b border-base-200 px-3 py-2">
              <span className="block truncate p-0 text-sm font-semibold text-base-content">
                {session.user.name}
              </span>
              <span className="block truncate p-0 text-xs text-base-content/60">
                {session.user.email}
              </span>
            </li>
            <li>
              <a href="/profile" className="text-sm">
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 21a8 8 0 0 0-16 0m8-10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
                আমার প্রোফাইল
              </a>
            </li>
            <li>
              <button
                type="button"
                className="text-sm text-error"
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
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10 17l5-5-5-5m5 5H3m9-9h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
                লগ আউট
              </button>
            </li>
          </ul>
      </details>
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
