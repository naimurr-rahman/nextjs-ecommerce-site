"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/api";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts(); // ✅ using lib/api.ts
        setProducts(data); // ✅ set products state
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          router={router}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart, router }: any) {
  const [quantity, setQuantity] = useState(1);

  const goToDetails = () => router.push(`/products/${product.id}`);

  /* ✅ Add to cart and navigate to /cart */
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      },
      quantity,
    );

    router.push("/cart");
  };

  return (
    <div className="border p-4 rounded flex flex-col items-center text-center">
      {/* Clickable Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 object-contain mb-2 cursor-pointer"
        onClick={goToDetails}
      />

      {/* Clickable Title */}
      <h2
        className="text-sm font-medium line-clamp-2 cursor-pointer"
        onClick={goToDetails}
      >
        {product.title}
      </h2>

      {/* Price */}
      <p className="text-green-600 font-semibold mb-2">${product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mb-2 justify-center">
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-12 text-center border rounded p-1"
        />
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button className="btn-primary w-full" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
