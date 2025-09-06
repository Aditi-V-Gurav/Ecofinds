import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, title: "Vintage Jacket", category: "Clothing", price: 1200, desc: "Retro style jacket", image: "https://via.placeholder.com/150", owner: "demo@ecofinds.com" },
    { id: 2, title: "Wooden Chair", category: "Furniture", price: 800, desc: "Classic wooden chair", image: "https://via.placeholder.com/150", owner: "demo@ecofinds.com" }
  ]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  function addToCart(p) {
    setCart([...cart, p]);
  }

  function buyNow() {
    alert("✅ Purchase successful!");
    setCart([]); // clear cart
  }

  function buySingleItem(index) {
    const item = cart[index];
    alert(`✅ Purchased: ${item.title} for ₹${item.price}`);
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  // ---------------- NAVBAR ----------------
  function Navbar() {
    return (
      <nav className="flex justify-between items-center bg-green-700 text-white px-6 py-3 shadow-md">
        <h1 className="text-xl font-bold">🌿 EcoFinds</h1>
        <div className="flex gap-4">
          <button onClick={() => { setView("feed"); setError(""); }} className="hover:underline">Home</button>
          <button onClick={() => { setView("cart"); setError(""); }} className="hover:underline">Cart ({cart.length})</button>
          <button onClick={() => { setView("mylistings"); setError(""); }} className="hover:underline">My Listings</button>
          <button 
            onClick={() => { setUser(null); setView("login"); setError(""); }} 
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }

  // ---------------- LOGIN ----------------
  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      setError("⚠️ Please enter both email and password");
      return;
    }

    const existingUser = users.find(u => u.email === email && u.password === password);
    if (!existingUser) {
      setError("❌ Invalid email or password");
      return;
    }

    setUser(existingUser);
    setView("feed");
    setError("");
  }

  // ---------------- SIGNUP ----------------
  function handleSignup(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      setError("⚠️ Please enter both email and password");
      return;
    }

    if (users.find(u => u.email === email)) {
      setError("⚠️ Email already registered");
      return;
    }

    const newUser = { email, password };
    setUsers([...users, newUser]);
    setUser(newUser);
    setView("feed");
    setError("");
  }

  // ---------------- LOGIN SCREEN ----------------
  if (!user && view === "login") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-80">
          <h1 className="text-3xl font-bold mb-4 text-center text-green-700">EcoFinds Login</h1>
          <form onSubmit={handleLogin} className="space-y-3">
            <input name="email" type="email" placeholder="Email" className="border p-2 w-full rounded" />
            <input type="password" name="password" placeholder="Password" className="border p-2 w-full rounded" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">Login</button>
          </form>
          <p className="mt-3 text-sm text-center">
            Don’t have an account?{" "}
            <button onClick={() => { setView("signup"); setError(""); }} className="text-blue-600 underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ---------------- SIGNUP SCREEN ----------------
  if (!user && view === "signup") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-80">
          <h1 className="text-3xl font-bold mb-4 text-center text-purple-700">EcoFinds Sign Up</h1>
          <form onSubmit={handleSignup} className="space-y-3">
            <input name="email" type="email" placeholder="Email" className="border p-2 w-full rounded" />
            <input type="password" name="password" placeholder="Password" className="border p-2 w-full rounded" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full">Sign Up</button>
          </form>
          <p className="mt-3 text-sm text-center">
            Already have an account?{" "}
            <button onClick={() => { setView("login"); setError(""); }} className="text-blue-600 underline">
              Login
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ---------------- FEED ----------------
  if (view === "feed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-teal-100">
        <Navbar />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white border rounded-2xl p-4 shadow-lg">
              <img src={p.image} alt="" className="mb-2 w-full rounded" />
              <h3 className="font-bold">{p.title}</h3>
              <p>₹{p.price}</p>
              <small className="text-gray-600 block">Seller: {p.owner}</small>

              {p.owner !== user?.email ? (
                <button
                  onClick={() => addToCart(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              ) : (
                <p className="text-sm text-gray-500 mt-2 italic">Your Listing</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------- CART ----------------
if (view === "cart") {
  function removeFromCart(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  function buySingleItem(index) {
    alert(`✅ Purchase successful: ${cart[index].title}`);
    removeFromCart(index);
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-200 to-red-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-orange-700">🛒 My Cart</h2>

        {cart.length === 0 && (
          <p className="text-gray-600 italic">Your cart is empty.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cart.map((c, i) => (
            <div
              key={i}
              className="flex gap-4 border p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <p className="text-gray-600 font-medium">₹{c.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => buySingleItem(i)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => removeFromCart(i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded-2xl shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">
              Total: ₹{total}
            </p>
            <button
              onClick={buyNow}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg"
            >
              ✅ Buy All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


  // ---------------- MY LISTINGS ----------------
  if (view === "mylistings") {
    const myItems = products.filter(p => p.owner === user?.email);

    function deleteItem(id) {
      setProducts(products.filter(p => p.id !== id));
    }

    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">My Listings</h2>
          <button 
            onClick={() => setView("addproduct")} 
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add New Product
          </button>

          {myItems.length === 0 && <p>You haven’t listed anything yet.</p>}

          {myItems.map(p => (
            <div key={p.id} className="border p-2 mb-2 bg-white rounded shadow">
              <h3 className="font-bold">{p.title}</h3>
              <p>₹{p.price}</p>
              <button 
                onClick={() => setView({ type: "editproduct", product: p })}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteItem(p.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------- ADD PRODUCT ----------------
  if (view === "addproduct") {
    function handleAdd(e) {
      e.preventDefault();
      const form = e.target;
      const newProduct = {
        id: Date.now(),
        title: form.title.value,
        price: parseInt(form.price.value),
        category: form.category.value,
        desc: form.desc.value,
        image: "https://via.placeholder.com/150",
        owner: user?.email
      };
      setProducts([...products, newProduct]);
      setView("mylistings");
    }

    return (
      <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-cyan-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleAdd} className="space-y-2">
            <input name="title" placeholder="Product Title" className="border p-2 w-full" />
            <input name="category" placeholder="Category" className="border p-2 w-full" />
            <input name="price" type="number" placeholder="Price" className="border p-2 w-full" />
            <textarea name="desc" placeholder="Description" className="border p-2 w-full" />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------- EDIT PRODUCT ----------------
  if (typeof view === "object" && view.type === "editproduct") {
    const product = view.product;

    function handleEdit(e) {
      e.preventDefault();
      const form = e.target;
      const updated = {
        ...product,
        title: form.title.value,
        category: form.category.value,
        price: parseInt(form.price.value),
        desc: form.desc.value
      };
      setProducts(products.map(p => p.id === product.id ? updated : p));
      setView("mylistings");
    }

    return (
      <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <form onSubmit={handleEdit} className="space-y-2">
            <input name="title" defaultValue={product.title} className="border p-2 w-full" />
            <input name="category" defaultValue={product.category} className="border p-2 w-full" />
            <input name="price" type="number" defaultValue={product.price} className="border p-2 w-full" />
            <textarea name="desc" defaultValue={product.desc} className="border p-2 w-full" />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}
