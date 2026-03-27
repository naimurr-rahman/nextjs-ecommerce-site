"use client";

import { useEffect, useState, use, useRef } from "react";
import { useCart } from "../../context/cartContext";

/* ✅ Product type */
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [moreProducts, setMoreProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const flyingImgRef = useRef<HTMLImageElement>(null);

  /* Fetch main product */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  /* Fetch more products */
  useEffect(() => {
    const fetchMore = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setMoreProducts(data.filter((p) => p.id !== Number(id)).slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMore();
  }, [id]);

  /* Handle Add to Cart animation */
  const handleAddToCart = (p: Product) => {
    addToCart(p);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 800);
  };

  if (!product) {
    return (
      <div className="container py-10 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container py-10 relative">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-12">
        {/* Image */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex justify-center items-center relative">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain hover:scale-105 transition duration-300"
          />

          {/* Flying image animation */}
          {animate && (
            <img
              ref={flyingImgRef}
              src={product.image}
              className="absolute top-0 left-0 w-20 h-20 object-contain animate-fly-to-cart"
            />
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <p className="text-green-600 text-2xl font-semibold mb-4">
            ${product.price}
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {product.rating && (
            <p className="text-sm text-gray-500 mb-6">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <button
            onClick={() => handleAddToCart(product)}
            className="btn-primary w-full sm:w-auto mb-6 relative overflow-hidden"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* More Products Carousel */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          You may also like
        </h2>

        {loading ? (
          <p className="text-center py-10">Loading more products...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {moreProducts.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 w-56 border rounded p-4 flex flex-col items-center text-center hover:shadow-lg transition snap-start"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-36 object-contain mb-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => (window.location.href = `/products/${p.id}`)}
                />
                <h3
                  className="text-sm font-medium line-clamp-2 cursor-pointer mb-1"
                  onClick={() => (window.location.href = `/products/${p.id}`)}
                >
                  {p.title}
                </h3>
                <p className="text-green-600 font-semibold mb-2">${p.price}</p>
                <button
                  className="btn-primary w-full"
                  onClick={() => (window.location.href = `/products/${p.id}`)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes fly-to-cart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(300px, -300px) scale(0);
            opacity: 0;
          }
        }
        .animate-fly-to-cart {
          animation: fly-to-cart 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
