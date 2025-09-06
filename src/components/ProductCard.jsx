export default function ProductCard({ p, onOpen }) {
  return (
    <div className="rounded-2xl border hover:shadow-md transition cursor-pointer overflow-hidden" onClick={onOpen}>
      <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <div className="font-medium line-clamp-1">{p.title}</div>
        <div className="text-sm opacity-70">{p.category}</div>
        <div className="font-semibold mt-1">
          {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(p.price)}
        </div>
      </div>
    </div>
  );
}
