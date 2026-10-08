import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
};


const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const products = await res.json();
    return (
        <div className="border-y border-base-300 bg-neutral py-2 text-sm text-neutral-content">
            <MarqueeText
                duration={50}
                pauseOnHover
                textSpacing="2.5rem"
                playOnlyInView={false}
            >
                {products.map((p:Product) => (
                    <span
                        key={p.id}
                        className="whitespace-nowrap inline-block mr-1"
                    >
                        {p.categoryIcon} {p.nameBn}
                        &nbsp;&nbsp;

                        <span className="font-semibold">
                            {p.today} টাকা/কেজি
                        </span>

                        &nbsp;&nbsp;

                        <span>
                            {p.change.dir === "up" ? "▲" : "▼"}
                            {p.change.pct}%
                        </span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};
export default Marquee;