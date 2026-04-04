"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* 🔥 HERO / SPACE */}
      <div className="h-30" />

      {/* 🛍️ CATEGORY SECTION */}
      <section className="mb-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Shop by Categories</h2>
        <p className="text-gray-500 text-sm mb-8">
          Discover the latest trends in beauty
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT BIG IMAGE */}
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src="/cat1.jpg"
              className="w-full h-87.5 object-cover group-hover:scale-105 transition"
            />
          </div>

          {/* CENTER STACK */}
          <div className="grid gap-6">
            <div className="relative group overflow-hidden rounded-xl">
              <img
                src="/cat2.jpg"
                className="w-full h-41.25 object-cover group-hover:scale-105 transition"
              />
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 text-sm rounded-full shadow">
                Accessories
              </button>
            </div>

            <div className="relative group overflow-hidden rounded-xl">
              <img
                src="/cat3.jpg"
                className="w-full h-41.25 object-cover group-hover:scale-105 transition"
              />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src="/cat4.jpg"
              className="w-full h-87.5 object-cover group-hover:scale-105 transition"
            />
          </div>
        </div>
      </section>

      {/* 🛒 PRODUCTS SECTION */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 20).map((p) => (
            <div
              key={p.id}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition bg-white"
            >
              <Link href={`/products/${p.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-green-600 font-semibold">
                    ${p.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SPACE */}
      <div className="h-25" />
    </div>
  );
}