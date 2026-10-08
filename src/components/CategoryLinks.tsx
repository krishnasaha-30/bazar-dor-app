"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/api";

export default function CategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <ul className="flex min-w-max gap-5 text-sm">
      <li>
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={`transition hover:text-green-700 ${
            pathname === "/" ? "font-bold text-green-700" : ""
          }`}
        >
          সব পণ্য
        </Link>
      </li>
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;

        return (
          <li key={category.slug}>
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`transition hover:text-green-700 ${
                isActive ? "font-bold text-green-700" : ""
              }`}
            >
              {category.icon} {category.nameBn}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
