import Link from "next/link";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      {/* HERO */}
      <section className="container py-20 text-center">
        <h1>Minimal Shopping Experience</h1>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Clean design. Fast performance. Built for modern users.
        </p>

        <Link href="/products" className="btn-primary mt-6 inline-block">
          Browse Products
        </Link>
      </section>

      {/* PRODUCTS */}
      <section className="container pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2>Featured</h2>

          <Link href="/products" className="text-sm text-gray-500">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 12).map((p: any) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="card p-5 group"
            >
              <div className="h-40 flex items-center justify-center mb-4">
                <img
                  src={p.image}
                  className="h-full object-contain group-hover:scale-105 transition"
                />
              </div>

              <h3 className="line-clamp-2">{p.title}</h3>

              <p className="text-green-600 mt-2 font-semibold">${p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
