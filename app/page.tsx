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
    .then((data) => setProducts(data.products)) // ✅ FIXED
    .finally(() => setLoading(false));
}, []);

  if (loading)
    return <div className="container py-10 text-center">Loading...</div>;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Products Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded hover:shadow-lg transition text-center"
          >
            <Link href={`/products/${p.id}`}>
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-40 object-contain mb-2 cursor-pointer"
              />
              <h3 className="font-medium line-clamp-2 mb-1">{p.title}</h3>
            </Link>
            <p className="text-green-600 font-semibold mb-2">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
