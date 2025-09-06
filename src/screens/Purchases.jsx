import { currency } from "../lib/store.js";

export default function Purchases({ items }) {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-3">
      <h2 className="text-xl font-semibold">Previous Purchases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl border overflow-hidden">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-3 space-y-1">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm opacity-70">{p.category}</div>
              <div className="font-semibold">{currency(p.price)}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm opacity-70">No purchases yet.</div>}
      </div>
    </div>
  );
}
