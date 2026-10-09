import Image from "next/image";
import BanglaDate from "./BanglaDate";
export default function Hero() {
    return (
        <section className="mx-4 mt-5 grid min-w-0 gap-8 overflow-hidden rounded-xl bg-white px-5 py-6 sm:mx-auto sm:max-w-6xl sm:px-8 md:grid-cols-2 md:items-center md:gap-6 md:py-8">
            <div className="flex min-w-0 flex-col items-start gap-4">
                <p className="mb-2 max-w-full rounded-lg border border-green-200 bg-green-100 px-2 py-1 text-sm font-bold leading-relaxed text-green-800"><BanglaDate /></p>
                <p className="text-sm font-medium text-secondary-content/80">
                    <span className="rounded-full bg-secondary px-3 py-1">প্রতিদিনের বাজার হালনাগাদ</span>
                </p>
                <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    আজকের বাজারদর, <br className="hidden sm:block" /> এক নজরে জানুন
                </h1>
                <p className="mt-1 max-w-lg text-sm leading-7 text-base-content/70 sm:text-base">
                    চাল, ডাল, তেল, সবজি, মাছ-মাংস — নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম এবং দাম বাড়া-কমার
                    হিসাব দেখে নিন বিভিন্ন বাজার থেকে।
                </p>
                <a href="#সব-পণ্য" className="btn btn-primary mt-2 w-full sm:w-auto">
                    সব পণ্যের দাম দেখুন
                </a>
            </div>
            <div className="flex min-w-0 justify-center">
                <Image
                    src="/bazar-hero.png"
                    alt="বাজারের পণ্য"
                    width={315}
                    height={263}
                    priority
                    className="h-auto w-full max-w-xs rounded-box sm:max-w-sm md:max-w-md"
                />
            </div>
        </section>
    );
}
