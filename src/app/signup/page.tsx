import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { getSafeReturnTo } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  title: "সাইন আপ | বাজার দর",
};

type SignUpPageProps = {
  searchParams: Promise<{ callbackURL?: string | string[] }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackURL } = await searchParams;
  const returnTo = getSafeReturnTo(
    Array.isArray(callbackURL) ? callbackURL[0] : callbackURL,
  );

  return <AuthForm mode="signup" callbackURL={returnTo} />;
}
