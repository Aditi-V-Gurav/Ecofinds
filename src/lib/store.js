// Local storage key
export const APP_KEY = "ecofinds_local_state_v1";

// Predefined categories
export const CATEGORIES = [
  "Fashion",
  "Electronics",
  "Home & Living",
  "Books",
  "Sports & Outdoors",
  "Toys & Games",
  "Other",
];

export const PLACEHOLDER_IMG = "https://placehold.co/600x400?text=EcoFinds+Image";

// Helpers
export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
}

export function currency(n) {
  const val = Number(n || 0);
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(val);
}

// Seed state
export const initialSeed = {
  user: null, // current logged-in user
  users: [
    {
      id: "u_demo",
      email: "demo@ecofinds.app",
      password: "demo123",
      username: "Demo User",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Demo",
    },
  ],
  products: [
    {
      id: uid("p"),
      ownerId: "u_demo",
      title: "Vintage Denim Jacket",
      description: "Gently used, size M. Classic fit.",
      category: "Fashion",
      price: 28,
      image: PLACEHOLDER_IMG,
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: uid("p"),
      ownerId: "u_demo",
      title: "Kindle Paperwhite (2018)",
      description: "Works great, minor scuffs. Includes cover.",
      category: "Electronics",
      price: 55,
      image: PLACEHOLDER_IMG,
      createdAt: Date.now() - 86400000 * 6,
    },
    {
      id: uid("p"),
      ownerId: "u_demo",
      title: "As New Yoga Mat",
      description: "Non-slip, barely used.",
      category: "Sports & Outdoors",
      price: 12,
      image: PLACEHOLDER_IMG,
      createdAt: Date.now() - 86400000 * 1,
    },
  ],
  cart: [],
  purchases: [],
};

// Persistence
export function loadStore() {
  try {
    const raw = localStorage.getItem(APP_KEY);
    return raw ? JSON.parse(raw) : initialSeed;
  } catch {
    return initialSeed;
  }
}

export function saveStore(data) {
  localStorage.setItem(APP_KEY, JSON.stringify(data));
}
