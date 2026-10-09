
import Image from "next/image";
import Link from "next/link";
import BanglaDate from "./BanglaDate";
import AuthActions from "./AuthActions";

const Header = () => {
    return (
        <div className="border-b border-black/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="min-w-0 leading-tight">
                    <span className="flex min-w-0 items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded bg-green-300 p-1.5 sm:size-11">
                            <Image src="/logo-icon.png" alt="" width={30} height={30} />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-lg font-bold sm:text-xl">বাজার দর</span>
                            <span className="block text-xs leading-relaxed text-base-content/60"><BanglaDate /></span>
                        </span>
                    </span>
                </Link>

                <AuthActions />
            </div>
        </div>
    );
};

export default Header;