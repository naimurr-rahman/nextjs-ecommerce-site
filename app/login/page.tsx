"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (login(u, p)) {
      router.push("/dashboard");
    } else {
      alert("Invalid");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-6 border rounded shadow">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="username"
          onChange={(e) => setU(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3"
          type="password"
          placeholder="password"
          onChange={(e) => setP(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
