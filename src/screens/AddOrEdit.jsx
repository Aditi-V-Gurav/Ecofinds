import { useState } from "react";
import { CATEGORIES, PLACEHOLDER_IMG } from "../lib/store.js";
import { ArrowLeft } from "lucide-react";

export default function AddOrEdit({ edit, onSave, onBack }) {
  const isEdit = Boolean(edit);
  const [title, setTitle] = useState(edit?.title || "");
  const [cat, setCat] = useState(edit?.category || CATEGORIES[0]);
  const [desc, setDesc] = useState(edit?.description || "");
  const [price, setPrice] = useState(edit?.price?.toString() || "");
  const [image, setImage] = useState(edit?.image || PLACEHOLDER_IMG);

  function handleSubmit() {
    if (!title || !price) return alert("Please fill title and price");
    onSave({
      title,
      category: cat,
      description: desc,
      price: Number(price),
      image,
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-3">
      <button className="rounded-2xl px-3 py-2 hover:bg-neutral-100" onClick={onBack}>
        <ArrowLeft className="inline w-4 h-4 mr-1" />
        Back
      </button>

      <div className="rounded-2xl border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{isEdit ? "Edit Listing" : "Add New Product"}</h2>
        </div>
        <div className="p-4 space-y-3">
          <input
            className="w-full px-3 py-2 rounded-2xl border"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select className="w-full px-3 py-2 rounded-2xl border" value={cat} onChange={(e) => setCat(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <textarea
            className="w-full px-3 py-2 rounded-2xl border min-h-28"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            className="w-full px-3 py-2 rounded-2xl border"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <img src={image} alt="preview" className="w-24 h-16 object-cover rounded-xl border" />
            <input
              className="flex-1 px-3 py-2 rounded-2xl border"
              placeholder="Image URL (placeholder allowed)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button className="rounded-2xl bg-emerald-600 text-white px-3 py-2" onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Submit Listing"}
          </button>
        </div>
      </div>
    </div>
  );
}
