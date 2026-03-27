"use client";

import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const user = getUser();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return <h1>Redirecting...</h1>;
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
