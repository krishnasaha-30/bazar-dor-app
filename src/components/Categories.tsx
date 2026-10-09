import { getCategories } from "@/lib/api";
import CategoryLinks from "./CategoryLinks";

const Categories = async () => {
    const categories = await getCategories();
    return (
        <div className="border-b border-black/10 px-4 py-3">
            <nav aria-label="পণ্যের বিভাগ" className="mx-auto max-w-6xl overflow-x-auto overscroll-x-contain">
                <CategoryLinks categories={categories} />
            </nav>
        </div>
    );
};

export default Categories;