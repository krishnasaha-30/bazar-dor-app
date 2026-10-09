import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "সাইন আপ | বাজার দর",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
