
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";


const Header = () => {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });
       
        setDate(currentDate);
    }, []);
    return (
        <div className="border-b border-black/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 ">

                <Link href="/" className="leading-tight">
                    <div className="flex items-center gap-3">
                        <div className="rounded  bg-green-300 p-2"> <Image src="/logo-icon.png" alt="logo" width={30} height={30} /></div>
                        <div>
                            <span className="block text-xl font-bold ">বাজার দর</span>
                            <span className="block min-h-4 text-xs text-base-content/60">{date}</span>
                        </div>
                    </div>
                </Link>

                <div className="flex gap-3">
                    <Link href="/signin" className="btn btn-outline btn-success  btn-sm sm:btn-md">
                        সাইন ইন
                    </Link>
                    <Link href="/signup" className=" rounded-2 btn btn-active bg-green-500 text-white btn-success btn-sm sm:btn-md">
                        সাইন আপ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;