

export interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface PriceChange {
    dir: "up" | "down";
    pct: number;
}

export interface Product {
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
    change: PriceChange;
    markets: Market[];
}

export interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const API_BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`, {
        next: {
            revalidate: 300,
        },
    });
    if (!response.ok) {
        throw new Error(`Could not load products: ${response.status}`);
    }
    return response.json();
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
    const response = await fetch(
        `${API_BASE_URL}/products?category=${encodeURIComponent(slug)}`,
        {
            next: {
                revalidate: 300,
            },
        }
    );
    if (!response.ok) {
        throw new Error(`Could not load products for category "${slug}": ${response.status}`);
    }
    return response.json();
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        next: {
            revalidate: 300,
        },
    });
    if (!response.ok) {
        throw new Error(`Could not load categories: ${response.status}`);
    }
    return response.json();
}

export async function getCategory(slug: string): Promise<Category | null> {
    const response = await fetch(
        `${API_BASE_URL}/categories/${encodeURIComponent(slug)}`,
        {
            next: {
                revalidate: 300,
            },
        }
    );
    if (response.status === 404) return null;
    if (!response.ok) {
        throw new Error(`Could not load category "${slug}": ${response.status}`);
    }
    return response.json();
}

export default getProducts;


// "id": 1,
// "slug": "sorno-machi-chal",
// "nameBn": "স্বর্ণমাছি চাল",
// "category": "chal",
// "categoryNameBn": "চাল",
// "categoryIcon": "🍚",
// "unit": "kg",
// "image": "🍚",
// "today": 148,
// "yesterday": 145,
// "lastWeek": 142,
// "lastMonth": 138,
// "change": {
// "dir": "up",
// "pct": 2.1
// },
// "markets": [
// {
// "market": "কারওয়ান বাজার",
// "division": "ঢাকা",
// "min": 146,
// "max": 165
// },
// {
// "market": "গ্রীন মার্কেট, মিরপুর",
// "division": "ঢাকা",
// "min": 143,
// "max": 159
// },
// {
// "market": "চৌদগ্রাম বাজার",
// "division": "চট্টগ্রাম",
// "min": 142,
// "max": 163
// },
// {
// "market": "আমতলী বাজার",
// "division": "চট্টগ্রাম",
// "min": 138,
// "max": 155
// },
// {
// "market": "সদর বাজার",
// "division": "রাজশাহী",
// "min": 134,
// "max": 148
// },
// {
// "market": "বাসারহাট বাজার",
// "division": "রাজশাহী",
// "min": 135,
// "max": 152
// },
// {
// "market": "মাঠ বাজার",
// "division": "ময়মনসিংহ",
// "min": 132,
// "max": 146
// },
// {
// "market": "চৌর বাজার",
// "division": "ময়মনসিংহ",
// "min": 135,
// "max": 155
// },
// {
// "market": "বাজারহাট",
// "division": "খুলনা",
// "min": 134,
// "max": 151
// },
// {
// "market": "ডবলগেট বাজার",
// "division": "খুলনা",
// "min": 139,
// "max": 154
// },
// {
// "market": "আমবাজার",
// "division": "সিলেট",
// "min": 143,
// "max": 165
// },
// {
// "market": "চৌরাস্তা বাজার",
// "division": "সিলেট",
// "min": 141,
// "max": 158
// }
// ]





