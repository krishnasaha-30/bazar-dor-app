import Link from "next/link";

 type Category = {
    id: number;
    nameBn: string;
    slug: string;
    icon: string;
};
const Categories = async ({ activeSlug = "" }) => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    const categories = await res.json();

    return (

        <div className="border-b border-black/10 p-4">
            <nav className="mx-auto max-w-6xl  ">
                <ul className="flex gap-5">

                    {/* All Products */}
                    <li>
                        <Link
                            href="/"
                            className={`${activeSlug === ""
                                    ? "text-green-500 font-bold"
                                    : ""
                                }`}
                        >
                            সব পণ্য
                        </Link>
                    </li>

                    {/* Categories */}
                    {categories.map((c: Category) => (
                        <li key={c.slug}>
                            <Link
                                href={`/category/${c.slug}`}
                                className={`${activeSlug === c.slug
                                        ? "text-green-500 font-bold"
                                        : ""
                                    }`}
                            >
                                {c.icon} {c.nameBn}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Categories;