"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  const loadCart = () => setCart(getCart());

  useEffect(() => {
    loadCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push("/products")}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🛍️ LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="card p-4 flex gap-4 items-center">
              {/* IMAGE */}
              <img src={item.image} className="w-20 h-20 object-contain" />

              {/* DETAILS */}
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>

                <p className="text-green-600 font-semibold mt-1">
                  ${item.price}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center border rounded">
                <button
                  onClick={() => {
                    updateQuantity(item.id, "dec");
                    loadCart();
                  }}
                  className="px-3 py-1"
                >
                  −
                </button>

                <span className="px-3">{item.quantity}</span>

                <button
                  onClick={() => {
                    updateQuantity(item.id, "inc");
                    loadCart();
                  }}
                  className="px-3 py-1"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  loadCart();
                }}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* 💳 RIGHT SIDE (SUMMARY) */}
        <div className="card p-6 h-fit sticky top-20">
          <h2 className="mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-sm">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span>Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="btn-primary w-full"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
