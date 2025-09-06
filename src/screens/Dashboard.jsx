import { useState } from "react";
import { Check } from "lucide-react";

export default function Dashboard({ user, onSave }) {
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  function save() {
    onSave({ username, email, password, avatar });
    alert("Profile updated");
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="rounded-2xl border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">User Dashboard</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={
                avatar ||
                `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username || email)}`
              }
              alt="avatar"
              className="w-16 h-16 rounded-2xl border"
            />
            <button className="rounded-2xl border px-3 py-2" onClick={() => setAvatar("")}>
              Reset Avatar
            </button>
          </div>

          <input
            className="w-full px-3 py-2 rounded-2xl border"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded-2xl border"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded-2xl border"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded-2xl border"
            placeholder="Avatar URL (optional)"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <button className="rounded-2xl bg-emerald-600 text-white px-3 py-2" onClick={save}>
            <Check className="inline w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
