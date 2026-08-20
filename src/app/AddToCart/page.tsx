
"use client";
import { useState } from "react";
import { useCart } from "@/app/context/cartContext";
import { useRouter } from "next/navigation";
import CheckoutPhotoShoot from "@/app/component/checkoutPhotoShoot/page";  

export default function CartPage() {
  const { cart, removeFromCart, getTotal, clearCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();
  const [isPhotoShootAdded, setIsPhotoShootAdded] = useState(false);


  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProceedToCheckout = () => {
    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.id)
    );
    localStorage.setItem("checkoutItems", JSON.stringify(selectedProducts));
    router.push("/Checkout");
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-black/10 pb-6 dark:border-white/15">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-black/45 dark:text-white/50">Unik Loh! / Checkout</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Shopping cart</h1>
          {cart.length > 0 && <p className="mt-3 text-sm text-black/60 dark:text-white/60">Spend another $59.20 for free delivery.</p>}
        </div>

        {cart.length === 0 ? (
          <section className="border border-black/10 bg-black/[.03] p-10 text-center dark:border-white/15 dark:bg-white/[.04]">
            <p className="text-lg font-semibold">Your cart is empty.</p>
            <p className="mt-2 text-sm opacity-60">Add something special to get started.</p>
          </section>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
            <section>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-semibold">{totalItems} item{totalItems === 1 ? "" : "s"}</span>
                <button onClick={clearCart} className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 opacity-60 transition hover:opacity-100">Clear cart</button>
              </div>
              <div className="border-y border-black/10 dark:border-white/15">
                {cart.map((item) => {
                  const quantity = item.quantity ?? 1;
                  return (
                    <article key={item.id} className="grid grid-cols-[auto_96px_minmax(0,1fr)_auto] gap-3 border-b border-black/10 py-5 last:border-0 dark:border-white/15 sm:grid-cols-[auto_112px_minmax(0,1fr)_auto] sm:gap-5">
                      <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="mt-1 h-4 w-4 accent-black dark:accent-white" aria-label={`Select ${item.title}`} />
                      <img src={item.image || "/favicon_io/android-chrome-192x192.png"} alt={item.title} width={112} height={140} className="h-32 w-24 object-cover sm:h-36 sm:w-28" />
                      <div className="min-w-0">
                        <h2 className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base">{item.title}</h2>
                        <p className="mt-1 text-xs opacity-55">ID: {item.id}</p>
                        <div className="mt-5 flex items-center gap-3">
                          <span className="text-xs uppercase tracking-wider opacity-55">Qty</span>
                          <div className="flex h-8 items-center border border-black/15 dark:border-white/20">
                            <button type="button" onClick={() => updateQuantity(item.id, quantity - 1)} className="w-8 text-lg opacity-60 hover:opacity-100" aria-label={`Decrease quantity of ${item.title}`}>−</button>
                            <span className="w-7 text-center text-sm">{quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.id, quantity + 1)} className="w-8 text-lg opacity-60 hover:opacity-100" aria-label={`Increase quantity of ${item.title}`}>+</button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="mt-3 text-xs font-semibold underline underline-offset-4 opacity-60 transition hover:opacity-100" aria-label={`Remove ${item.title}`}>Remove</button>
                      </div>
                      <p className="text-right text-sm font-bold sm:text-base">${(item.price * quantity).toFixed(2)}</p>
                    </article>
                  );
                })}
              </div>
              <button onClick={() => setIsPhotoShootAdded(true)} className="mt-7 text-sm font-semibold underline underline-offset-4 transition opacity-75 hover:opacity-100">+ Add an extra photoshoot session</button>
            </section>

            <aside className="h-fit bg-black/[.04] p-6 dark:bg-white/[.07] lg:sticky lg:top-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/15"><h2 className="font-bold">Order summary</h2><span className="text-sm opacity-60">{totalItems} item{totalItems === 1 ? "" : "s"}</span></div>
              <dl className="space-y-4 border-b border-black/10 py-5 text-sm dark:border-white/15"><div className="flex justify-between"><dt className="opacity-60">Item&apos;s total</dt><dd>${getTotal().toFixed(2)}</dd></div><div className="flex justify-between"><dt className="opacity-60">Shipping</dt><dd>TBD</dd></div></dl>
              <div className="flex justify-between py-5 font-bold"><span>Order total</span><span>${getTotal().toFixed(2)}</span></div>
              <button onClick={handleProceedToCheckout} disabled={selectedItems.length === 0} className="w-full bg-black py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/25 dark:bg-white dark:text-black dark:hover:bg-white/80 dark:disabled:bg-white/25">Checkout</button>
              <p className="mt-4 text-center text-xs opacity-55">Select the items you want to check out.</p>
            </aside>
          </div>
        )}
      </div>

      {isPhotoShootAdded && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-[var(--background)] shadow-2xl"><button onClick={() => setIsPhotoShootAdded(false)} className="absolute right-4 top-4 z-10 text-2xl" aria-label="Close checkout">×</button><div className="p-6 sm:p-10"><CheckoutPhotoShoot /></div></div></div>}
    </main>
  );
}