"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Hero() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });

        setDate(currentDate);
    }, []);
    return (
        <section className="rounded-xl mx-auto grid max-w-6xl px-6  md:grid-cols-2 md:py-6 bg-white mt-5">
            <div className="flex flex-col gap-4 ">
                <p className="text-sm font-bold text-green-700 mb-10 rounded-lg  border w-50 px-2 bg-green-200">{date}</p>
                <p className="text-sm font-medium text-secondary-content/80">
                    <span className="rounded-full bg-secondary px-3 py-1">প্রতিদিনের বাজার হালনাগাদ</span>
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    আজকের বাজারদর, <br className="hidden sm:block" /> এক নজরে জানুন
                </h1>
                <p className="mt-4 max-w-lg text-base-content/70">
                    চাল, ডাল, তেল, সবজি, মাছ-মাংস — নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম এবং দাম বাড়া-কমার
                    হিসাব দেখে নিন বিভিন্ন বাজার থেকে।
                </p>
                <a href="#সব-পণ্য" className="btn btn-primary mt-6">
                    সব পণ্যের দাম দেখুন
                </a>
            </div>
            <div className="flex justify-center">
                <Image
                    src="/bazar-hero.png"
                    alt="বাজারের পণ্য"
                    width={315}
                    height={263}
                    priority
                    className="h-auto w-full max-w-md rounded-box"
                />
            </div>
        </section>
    );
}
