

export type MarketPrice = {
    market: string;
    price: number;
    change: number;
};

export type Product = {
    id: string;
    slug: string;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    change: number; // percent, +up / -down
    category: string;
    description: string;
    min: number;
    max: number;
    avg: number;
    markets: MarketPrice[];
};

export type Category = {
    slug: string;
    name: string;
    icon: string;
};









