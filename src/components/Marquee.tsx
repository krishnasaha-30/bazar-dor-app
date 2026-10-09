import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css";
import getProducts from "@/lib/api";
import { formatChange, formatPrice, formatUnit } from "@/lib/bn";


const Marquee = async () => {
    const products = await getProducts();
    return (
        <div className="w-full overflow-hidden border-y border-base-300 bg-neutral py-2 text-xs text-neutral-content sm:text-sm">
            <MarqueeText
                duration={50}
                pauseOnHover
                textSpacing="2.5rem"
                playOnlyInView={false}
            >
                {products.map((p) => (
                    <span
                        key={p.id}
                        className="mr-1 inline-block whitespace-nowrap"
                    >
                        {p.categoryIcon} {p.nameBn}
                        &nbsp;&nbsp;

                        <span className="font-semibold">
                            {formatPrice(p.today)}/{formatUnit(p.unit).replace(/^প্রতি\s*/, "")}
                        </span>

                        &nbsp;&nbsp;

                        <span>{formatChange(p.change.pct)}</span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};
export default Marquee;