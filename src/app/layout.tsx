import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Noto_Serif_Bengali } from "next/font/google";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { Suspense } from "react";
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} scroll-smooth`}
    >
      <body>
        <Header />
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl overflow-hidden px-4 py-3">
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-gray-200"
                  />
                ))}
              </div>
            </div>
          }
        >
          <Categories />
        </Suspense>
        <Suspense
          fallback={
            <div className="border-b border-black/10 py-2">
              <div className="mx-auto max-w-6xl px-4">
                <span className="text-sm text-gray-500">
                  বাজার দর লোড হচ্ছে...
                </span>
              </div>
            </div>
          }
        >
          <Marquee />
        </Suspense>
        <div>{children}</div>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}



// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/krishnasaha-30/bazar-dor-app.git
// git push -u origin main
