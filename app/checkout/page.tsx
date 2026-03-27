"use client";

import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  // Total calculation
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="container py-16 text-center">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
      </div>
    );

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    clearCart(); // Clear the cart
    router.push("/"); // Redirect to home
  };

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🧾 LEFT SIDE - Products */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />

              {/* Product Info */}
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-12 text-center border rounded p-1"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <p className="text-green-600 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* 💳 RIGHT SIDE - Order Summary */}
        <div className="card p-6 h-fit sticky top-20 space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Place Order Button */}
          <button className="btn-primary w-full" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
