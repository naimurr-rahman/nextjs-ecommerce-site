"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <h1 className="text-xl font-bold">Shop</h1>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/" className="hover:text-gray-500">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-500">
            Products
          </Link>
          <Link href="/cart" className="hover:text-gray-500">
            Cart
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
        </div>
      )}
    </nav>
  );
}
