"use client"; // important!

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  return (
    <div className="container py-10">
      <h1>Dashboard</h1>
      <p>Cart items: {cart.length}</p>
    </div>
  );
}
