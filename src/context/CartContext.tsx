"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartProviderProps = {
  children: ReactNode
}

export interface CartItem {
  id: number;
  name: string;
  fixed_price: number;
  thumbnail: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  hasHydrated: boolean;
}

const CartContext = createContext({} as CartContextType)

const MAX_QTY = 99;

export const CartProvider = ({ children }: CartProviderProps) => {

  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Load cart from localStorage 
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.error("Invalid cart data in localStorage:", error);
        setItems([]);
      }
    }
    setHasHydrated(true);
  }, []);

  // save to localStorage
  useEffect(() => {
    if (!hasHydrated) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(items));
    }, 250);
    return () => clearTimeout(timeout);
  }, [items, hasHydrated]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QTY) }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1 || quantity > MAX_QTY) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.fixed_price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        hasHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);;
};
