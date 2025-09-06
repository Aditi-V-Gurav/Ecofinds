import { currency } from "../lib/store.js";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function MyListings({ items, onAdd, onEdit, onDelete }) {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">My Listings</h2>
        <button className="ml-auto px-3 py-2 rounded-2xl bg-emerald-600 text-white" onClick={onAdd}>
          <Plus className="inline w-4 h-4 mr-1" />
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl border overflow-hidden">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-3 space-y-1">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm opacity-70">{p.category}</div>
              <div className="font-semibold">{currency(p.price)}</div>
              <div className="flex gap-2 pt-2">
                <button className="rounded-2xl border px-3 py-1.5" onClick={() => onEdit(p)}>
                  <Edit className="inline w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  className="rounded-2xl border px-3 py-1.5 text-red-600"
                  onClick={() => onDelete(p.id)}
                >
                  <Trash2 className="inline w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm opacity-70">No listings yet. Click “Add New”.</div>}
      </div>
    </div>
  );
}
