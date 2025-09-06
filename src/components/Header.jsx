import { ShoppingCart, User, LogOut, Plus, Package } from "lucide-react";

export default function Header({ currentUser, cartCount, onNavigate, onLogout }) {
  return (
    <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto flex items-center gap-3 p-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-xl">EcoFinds</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-2xl hover:bg-neutral-100" onClick={() => onNavigate("feed")}>
            Feed
          </button>

          {currentUser && (
            <>
              <button className="px-3 py-1.5 rounded-2xl hover:bg-neutral-100" onClick={() => onNavigate("mine")}>
                <Plus className="inline w-4 h-4 mr-1" />
                My Listings
              </button>
              <button className="px-3 py-1.5 rounded-2xl hover:bg-neutral-100" onClick={() => onNavigate("cart")}>
                <ShoppingCart className="inline w-4 h-4 mr-1" />
                Cart ({cartCount})
              </button>
              <button className="px-3 py-1.5 rounded-2xl hover:bg-neutral-100" onClick={() => onNavigate("purchases")}>
                <Package className="inline w-4 h-4 mr-1" />
                Purchases
              </button>
              <button className="px-3 py-1.5 rounded-2xl hover:bg-neutral-100" onClick={() => onNavigate("dashboard")}>
                <User className="inline w-4 h-4 mr-1" />
                Dashboard
              </button>
            </>
          )}

          {currentUser ? (
            <button className="px-3 py-1.5 rounded-2xl border hover:bg-neutral-50" onClick={onLogout}>
              <LogOut className="inline w-4 h-4 mr-1" />
              Logout
            </button>
          ) : (
            <button className="px-3 py-1.5 rounded-2xl bg-emerald-600 text-white hover:opacity-90" onClick={() => onNavigate("login")}>
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
