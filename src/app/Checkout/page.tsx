"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  image?: string;
  description?: string;
};

export default function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  // const [isPhotoShootAdded, setIsPhotoShootAdded] = useState<boolean>(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("checkoutItems");
    if (storedItems) {
      const storedProducts: Product[] = JSON.parse(storedItems);
      const items = storedProducts.map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      }));
      setCheckoutItems(items);
      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalPrice);
    }
  }, []);

  // function openPhotoShoot() {
  //   setIsPhotoShootAdded(true);
  // }

  // function closePhotoShoot() {
  //   setIsPhotoShootAdded(false);
  // }

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-black/10 pb-6 dark:border-white/15">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-55">Unik Loh! / Checkout</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Review your order</h1>
          <p className="mt-3 text-sm opacity-65">Confirm your selected items before continuing to payment.</p>
        </header>

      {checkoutItems.length === 0 ? (
        <section className="border border-black/10 bg-black/[.03] p-10 text-center dark:border-white/15 dark:bg-white/[.04]">
          <p className="text-lg font-semibold">No items selected for checkout.</p>
          <p className="mt-2 text-sm opacity-60">Return to your cart and choose the products you want to purchase.</p>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="border-y border-black/10 dark:border-white/15">
            <div className="flex items-center justify-between border-b border-black/10 py-4 dark:border-white/15">
              <h2 className="font-bold">Order items</h2>
              <span className="text-sm opacity-60">{checkoutItems.length} product{checkoutItems.length === 1 ? "" : "s"}</span>
            </div>

          {checkoutItems.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-b border-black/10 py-5 last:border-0 dark:border-white/15 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:gap-5"
            >
              <img src={item.image || "/favicon_io/android-chrome-192x192.png"} alt={item.title} width={112} height={140} className="h-28 w-[88px] object-cover sm:h-36 sm:w-28" />
              <div className="min-w-0">
                <h3 className="text-base font-semibold sm:text-lg">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 opacity-65">{item.description || "A selected item from the Unik Loh collection."}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  <span className="opacity-60">Quantity: {item.quantity || 1}</span>
                  <span className="opacity-60">Unit price: ${item.price.toFixed(2)}</span>
                </div>
              </div>
              <p className="col-start-2 text-left text-base font-bold sm:col-start-auto sm:text-right">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
            </article>
          ))}
          </section>

          <aside className="h-fit bg-black/[.04] p-6 dark:bg-white/[.07] lg:sticky lg:top-6">
            <h2 className="border-b border-black/10 pb-4 font-bold dark:border-white/15">Order summary</h2>
            <dl className="space-y-4 border-b border-black/10 py-5 text-sm dark:border-white/15">
              <div className="flex justify-between"><dt className="opacity-60">Subtotal</dt><dd>${total.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="opacity-60">Shipping</dt><dd>Calculated at payment</dd></div>
            </dl>
            <div className="flex justify-between py-5 text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button onClick={() => (window.location.href = "/Payment")} className="w-full bg-black py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80">Proceed to payment</button>
            <p className="mt-4 text-center text-xs opacity-55">You will review your payment details on the next page.</p>
          </aside>
        </div>
      )}
      </div>
    </main>
  );
}