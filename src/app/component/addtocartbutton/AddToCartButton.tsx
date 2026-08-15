"use client";

import React from "react";
import { useCart } from "@/app/context/cartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  images?: string;
  // totalItems: number;
}

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  // console.log(product + "from props")
  const handleAddToCart = () => {
    // Get existing cart items or create empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists
    const isExisting = existingCart.some((item: Product) => item.id === product.id);

    if (isExisting) {
      alert("Item is already in your cart!");
      return;
    }

    addToCart(product);

    // Add new item
    const updatedCart = [...existingCart, product];

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.title} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600 active:bg-red-700 dark:bg-white dark:text-black dark:hover:bg-red-200"
    >
      Add to Cart
    </button>
  );
}
