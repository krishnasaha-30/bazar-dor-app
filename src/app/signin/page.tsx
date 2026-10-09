import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "সাইন ইন | বাজার দর",
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
