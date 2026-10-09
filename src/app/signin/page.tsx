import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { getSafeReturnTo } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  title: "সাইন ইন | বাজার দর",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackURL?: string | string[] }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackURL } = await searchParams;
  const returnTo = getSafeReturnTo(
    Array.isArray(callbackURL) ? callbackURL[0] : callbackURL,
  );

  return <AuthForm mode="signin" callbackURL={returnTo} />;
}
