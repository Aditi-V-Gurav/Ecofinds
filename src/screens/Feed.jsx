import { useMemo } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { CATEGORIES } from "../lib/store.js";
import { Search } from "lucide-react";

export default function Feed({
  products,
  search,
  setSearch,
  category,
  setCategory,
  onAddListing,
  onOpenDetail,
  currentUser,
}) {
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [products, category, search]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* search */}
        <div className="relative flex-1">
          <input
            className="w-full px-9 py-2 rounded-2xl border"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* category filter */}
        <select
          className="px-3 py-2 rounded-2xl border w-full md:w-60"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* add listing */}
        {currentUser && (
          <button className="px-3 py-2 rounded-2xl bg-emerald-600 text-white" onClick={onAddListing}>
            + Add Listing
          </button>
        )}
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={() => onOpenDetail(p.id)} />
        ))}
      </div>
    </div>
  );
}
