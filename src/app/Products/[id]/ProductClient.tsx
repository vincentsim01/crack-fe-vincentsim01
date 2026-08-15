"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/app/component/addtocartbutton/AddToCartButton";

export default function ProductClient({ product, id }: { product: Product; id: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = document.cookie.split("; ").find((cookie) => cookie.startsWith("user-role="))?.split("=")[1];
    setIsAdmin(Boolean(role && role !== "null" && role !== "USER"));
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="flex h-64 items-center justify-center text-sm text-black/60">Loading product</div>;

  const productImage = product.image || "/placeholder.png";

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-black/55 dark:text-white/55">
        <ol className="flex items-center gap-2"><li><Link href="/" className="hover:text-red-600">Home</Link></li><li>/</li><li><Link href="/Products" className="hover:text-red-600">Products</Link></li><li>/</li><li className="max-w-44 truncate text-black dark:text-white">{product.title}</li></ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,25rem)] lg:gap-10">
        <section aria-label="Product images" className="grid grid-cols-2 gap-1 sm:gap-2">
          {[0, 1, 2, 3].map((imageIndex) => (
            <div key={imageIndex} className="aspect-4/5 overflow-hidden bg-zinc-100">
              <Image src={productImage} alt={imageIndex === 0 ? product.title : `${product.title} product view ${imageIndex + 1}`} width={700} height={875} unoptimized className={`h-full w-full object-cover ${imageIndex % 2 === 1 ? "scale-x-[-1]" : ""}`} />
            </div>
          ))}
        </section>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-xs text-black/55 dark:text-white/55">Product ID: {id}</p>
          <h1 className="mt-2 text-xl font-medium text-black dark:text-white">{product.title}</h1>
          <p className="mt-1 text-sm leading-6 text-black/65 dark:text-white/65">{product.description}</p>
          <div className="mt-6 border-y border-black/15 py-5 dark:border-white/20"><p className="text-2xl font-semibold text-red-600">${product.price}</p><p className="mt-2 text-xs text-black/55 dark:text-white/55">{product.stock > 0 ? `${product.stock} items available` : "Currently out of stock"}</p></div>
          <div className="mt-6"><p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-black/65 dark:text-white/65">Select size</p><div className="grid grid-cols-6 gap-2">{["XS", "S", "M", "L", "XL", "XXL"].map((size) => <button key={size} type="button" className="h-10 border border-black/25 text-xs transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/35 dark:hover:border-white dark:hover:bg-white dark:hover:text-black">{size}</button>)}</div></div>
          <div className="mt-6">{product.stock > 0 && <AddToCartButton product={product} />}</div>
          {isAdmin && <Link href={`/Products/${id}/edit`} className="mt-3 block border border-black/25 px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-black hover:text-white dark:border-white/35 dark:hover:bg-white dark:hover:text-black">Edit product</Link>}
          <section className="mt-8 border-t border-black/15 pt-5 dark:border-white/20"><h2 className="text-lg font-medium text-black dark:text-white">Find in store</h2><p className="mt-2 text-sm text-black/65 dark:text-white/65">Check local availability before you visit.</p><button type="button" className="mt-4 w-full border-b border-black/20 py-3 text-left text-sm text-red-600 hover:text-red-800 dark:border-white/25">Select a store</button></section>
          <div className="mt-8 flex justify-between gap-3"><Link href={`/Products/${Math.max(1, id - 1)}`} className={`text-sm underline underline-offset-4 ${id <= 1 ? "pointer-events-none opacity-35" : "hover:text-red-600"}`}>Previous item</Link><Link href={`/Products/${id + 1}`} className="text-sm underline underline-offset-4 hover:text-red-600">Next item</Link></div>
        </aside>
      </div>
    </main>
  );
}