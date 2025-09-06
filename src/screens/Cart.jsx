import { currency } from "../lib/store.js";

export default function Cart({ items, onRemove, onCheckout }) {
  const total = items.reduce((sum, p) => sum + (p?.price || 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-3">
      <h2 className="text-xl font-semibold">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl border">
            <div className="flex gap-3 p-3">
              <img src={p.image} alt={p.title} className="w-28 h-20 object-cover rounded-xl border" />
              <div className="flex-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm opacity-70">{p.category}</div>
                <div className="font-semibold">{currency(p.price)}</div>
              </div>
              <button className="rounded-2xl border px-3 py-2 text-red-600" onClick={() => onRemove(p.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm opacity-70">Your cart is empty.</div>}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="text-lg font-semibold">Total: {currency(total)}</div>
        <button
          disabled={items.length === 0}
          className="rounded-2xl px-3 py-2 bg-emerald-600 text-white disabled:opacity-50"
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
