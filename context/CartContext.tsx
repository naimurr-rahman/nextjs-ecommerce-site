"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  CartItem,
  getCart,
  addToCart as addToCartLib,
  removeFromCart as removeFromCartLib,
  updateQuantity as updateQuantityLib,
} from "@/lib/cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity" | "cartId">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const refreshCart = () => setCart(getCart());

  const addToCart = (product: Omit<CartItem, "quantity" | "cartId">) => {
    addToCartLib(product);
    refreshCart();
  };

  const removeFromCart = (id: number) => {
    removeFromCartLib(id);
    refreshCart();
  };

  const updateQuantity = (id: number, quantity: number) => {
    updateQuantityLib(id, quantity);
    refreshCart();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
