"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* ✅ Base product (NO quantity) */
export type BaseProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
};

/* ✅ Cart item (WITH quantity) */
export type CartItem = BaseProduct & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: BaseProduct, qty?: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* Load from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  /* Save to localStorage */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ✅ Clean addToCart */
  const addToCart = (product: BaseProduct, qty: number = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p,
        );
      }

      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (id: number, qty: number) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
};
