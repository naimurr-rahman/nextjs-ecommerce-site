"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const router = useRouter();

  // fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  // search
  useEffect(() => {
    if (!query) return setResults([]);

    const filtered = products
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);

    setResults(filtered);
  }, [query, products]);

  // lock body scroll when overlays open
  useEffect(() => {
    const anyOpen = mobileOpen || cartOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "auto";
  }, [mobileOpen, cartOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMegaOpen(false);
    setCartOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link href="/" className="text-2xl font-bold">
              Revone
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/">Home</Link>
              <Link href="/products">Shop</Link>

              {/* MEGA MENU (desktop hover, mobile click fallback) */}
              <div className="relative">
                <button
                  onClick={() => setMegaOpen((s) => !s)}
                  className="flex items-center gap-1"
                >
                  Categories <ChevronDown size={16} />
                </button>

                {megaOpen && (
                  <div className="absolute left-0 top-full w-105 bg-white shadow-xl border rounded-xl p-6 grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Men</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>T-Shirts</li>
                        <li>Shirts</li>
                        <li>Jeans</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Women</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>Dresses</li>
                        <li>Tops</li>
                        <li>Heels</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Accessories</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>Bags</li>
                        <li>Watches</li>
                        <li>Jewelry</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <Link href="#">Blog</Link>
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-4">
              {/* DESKTOP SEARCH */}
              <div className="relative hidden md:block">
                <div className="flex items-center border rounded-full px-3 py-1">
                  <Search size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="ml-2 outline-none text-sm"
                  />
                </div>

                {results.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
                    {results.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.id}`}
                        onClick={() => setQuery("")}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100"
                      >
                        <img
                          src={item.thumbnail}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="text-sm">
                          <p className="line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500">${item.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <User className="hidden md:block w-5 h-5" />

              {/* CART */}
              <button onClick={() => router.push("/cart")}className="relative cursor-pointer">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 text-[10px] bg-black text-white w-4 h-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </button>

              {/* MOBILE MENU */}
              <button
                className="md:hidden"
                onClick={() => setMobileOpen((s) => !s)}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-4">
            {/* mobile search */}
            <div className="flex items-center border rounded px-2 py-1">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 w-full outline-none text-sm"
                placeholder="Search..."
              />
            </div>

            {results.length > 0 && (
              <div className="bg-white border rounded">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.id}`}
                    onClick={closeAll}
                    className="flex items-center gap-3 p-2"
                  >
                    <img
                      src={item.thumbnail}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}

            <Link href="/" onClick={closeAll}>
              Home
            </Link>
            <Link href="/products" onClick={closeAll}>
              Shop
            </Link>

            <button
              onClick={() => setMegaOpen((s) => !s)}
              className="flex items-center gap-1"
            >
              Categories <ChevronDown size={16} />
            </button>

            {megaOpen && (
              <div className="pl-3 text-sm text-gray-600 space-y-2">
                <p>Men</p>
                <p>Women</p>
                <p>Accessories</p>
              </div>
            )}

            <Link href="#">Blog</Link>
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl z-50 transition-transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>

        <div className="p-4 text-sm text-gray-500">Your cart is empty</div>
      </div>

      {/* OVERLAY */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
    </>
  );
}
