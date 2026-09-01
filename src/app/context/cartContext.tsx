"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

type Product = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  image?: string;
  // totalItems: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
  updateQuantity: (id: number, quantity: number) => void;
  // totalItems?: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const storageKey = isAuthenticated && user ? `cart:user:${user.id}` : "cart:guest";
  const [cartState, setCartState] = useState<{ storageKey: string | null; items: Product[] }>({
    storageKey: null,
    items: [],
  });
  const cart = cartState.items;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const storedCart = localStorage.getItem(storageKey);
    const legacyGuestCart = storageKey === "cart:guest" ? localStorage.getItem("cart") : null;
    try {
      setCartState({ storageKey, items: JSON.parse(storedCart || legacyGuestCart || "[]") });
      if (!storedCart && legacyGuestCart) {
        localStorage.setItem(storageKey, legacyGuestCart);
      }
    } catch {
      setCartState({ storageKey, items: [] });
    }
  }, [isLoading, storageKey]);

  useEffect(() => {
    if (cartState.storageKey === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, cartState.storageKey, storageKey]);

  const addToCart = (product: Product) => {
    setCartState((current) => {
      const previousItems = current.storageKey === storageKey ? current.items : [];
      const existing = previousItems.find((item) => item.id === product.id);
      if (existing) {
        return {
          storageKey,
          items: previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
          ),
        };
      }
      return { storageKey, items: [...previousItems, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (id: number) => {
    setCartState((current) => ({ ...current, items: current.items.filter((item) => item.id !== id) }));
  };

  const clearCart = () => {
    setCartState((current) => ({ ...current, items: [] }));
  };

  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  };

    const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartState((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  const totalItems = getTotalItems();
  console.log('total items is'+totalItems)
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotal, getTotalItems, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};