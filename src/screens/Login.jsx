import { useState } from "react";

export default function LoginScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <div className="rounded-2xl border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{mode === "login" ? "Welcome back" : "Create an account"}</h2>
        </div>
        <div className="p-4 space-y-3">
          {mode === "signup" && (
            <input
              className="w-full px-3 py-2 rounded-2xl border"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
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

          <div className="flex gap-2">
            {mode === "login" ? (
              <button
                className="rounded-2xl bg-emerald-600 text-white px-3 py-2 flex-1"
                onClick={() => onLogin({ email, password })}
              >
                Log in
              </button>
            ) : (
              <button
                className="rounded-2xl bg-emerald-600 text-white px-3 py-2 flex-1"
                onClick={() => onRegister({ email, password, username: username || email.split("@")[0] })}
              >
                Sign up
              </button>
            )}
            <button
              className="rounded-2xl border px-3 py-2"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign up" : "Have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
