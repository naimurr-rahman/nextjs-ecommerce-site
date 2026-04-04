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

  /* ================= EMPTY STATE ================= */
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                <img src={item.image} className="w-16 h-16 object-contain" />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <p className="font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>

                <p className="text-lg font-semibold text-black mt-2">
                  ${item.price}
                </p>
              </div>

              {/* QUANTITY CONTROL */}
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    updateQuantity(item.id, "dec");
                    loadCart();
                  }}
                  className="px-3 py-2 hover:bg-gray-200 transition"
                >
                  −
                </button>

                <span className="px-4 font-medium">{item.quantity}</span>

                <button
                  onClick={() => {
                    updateQuantity(item.id, "inc");
                    loadCart();
                  }}
                  className="px-3 py-2 hover:bg-gray-200 transition"
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
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="border-t my-5" />

          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:opacity-90 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
