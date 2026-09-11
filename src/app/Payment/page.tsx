"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { ShippingDestination, ShippingCostOption } from "@/lib/api/api";
import { API_BASE_URL } from "@/lib/config";

type Product = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  image?: string;
  description?: string;
};

interface CheckoutItem {
  transactionId: number;
  productId: number;
  price: number; // or number if you convert it
  quantity?: number;
}

interface ShippingSelection {
  recipientName?: string;
  postalCode?: string;
  addressType?: "home" | "office";
  deliveryNotes?: string;
  destination: ShippingDestination;
  cost: ShippingCostOption;
}

const getPrice = (price: unknown) => Number(price) || 0;
const formatPrice = (price: unknown) => getPrice(price).toFixed(2);

export default function PaymentPage() {
  const { removeFromCart } = useCart();
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [shippingSelection, setShippingSelection] = useState<ShippingSelection | null>(null);

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1] || null
    );
  };

  const router = useRouter();
  const userId = getCookie("user-id");
  console.log("the user id is " + userId);
  const authToken = getCookie("auth-token");

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
      const totalPrice = Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
      setTotal(totalPrice);
    }

    const storedShipping = localStorage.getItem("shippingSelection");
    if (storedShipping) {
      setShippingSelection(JSON.parse(storedShipping));
    }
  }, []);

  const shippingCost = shippingSelection?.cost?.cost ? Number(shippingSelection.cost.cost) : 0;
  const grandTotal = Number((total + shippingCost).toFixed(2));





  const handlePayment = async () => {
    console.log("All cookies:", document.cookie);
    console.log("User ID:", userId);
    console.log("Type of User ID:", typeof userId);
    console.log("type of userid number " + typeof Number(userId));
    console.log("the total is" + grandTotal);
    console.log("Type of total" + typeof grandTotal);
    console.log("type of total parsefloat decimal " + parseFloat(grandTotal.toFixed(2)));
    try {
      const res = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          userId: Number(userId),
          total: parseFloat(grandTotal.toFixed(2)),
        }),
      });
      const data = await res.json();
      console.log("transactionid are " + data.id);
      setTransactionId(data.id);
      localStorage.setItem("transId", data.id.toString());
      console.log(transactionId);
    } catch (error) {
      console.error("Error creating transaction", error);
    }

    const storedItems2 = localStorage.getItem("checkoutItems");
    const storedItems2items: Product[] = storedItems2 ? JSON.parse(storedItems2) : [];

    const transId = localStorage.getItem("transId");
    const photoshootDate = localStorage.getItem("photoshootDate");
    console.log("photoshootDate adalah " + photoshootDate);
    console.log("photoshootDate type " + typeof photoshootDate);

    await Promise.all(
      storedItems2items.map(async (item: Product) => {
        // Check if item is a booking (ID 10001, 10002, or 10003)
        const isBooking = [10001, 10002, 10003].includes(item.id);
        if (isBooking) {
          // For booking items, first create a transaction-item
          const response = await fetch(`${API_BASE_URL}/transaction-items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              transactionId: Number(transId),
              productId: item.id,
              quantity: Number(item.quantity) || 1,
              price: formatPrice(item.price),
            }),
          });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Failed to create transaction-item for booking:", errorData);
          console.error("Response status:", response.status);
          console.error("Attempted to create with body:", {
            transactionId: Number(transId),
            productId: item.id,
            quantity: Number(item.quantity) || 1,
            price: formatPrice(item.price),
          });
          throw new Error(`Failed to create transaction-item for booking ${item.id}`);
        }

        const responseData = await response.json();
        const transitid = responseData.id;
        console.log("Transaction-item created with ID:", transitid);

        // Then create the booking with the transaction-item ID
        const response2 = await fetch(`${API_BASE_URL}/booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            transactionId: Number(transId),
            packageId: item.id,
            userId: Number(userId),
            bookingDate: new Date(photoshootDate ?? new Date()).toISOString(),
            transactionitemId: Number(transitid),
          }),
        });

        if (!response2.ok) {
          const errorData = await response2.json().catch(() => null);
          console.error("Failed to create booking:", errorData);
          console.error("Validation errors:", errorData?.message);
          console.error("Request body was:", {
            transactionId: Number(transId),
            packageId: item.id,
            userId: Number(userId),
            bookingDate: new Date().toISOString(),
            transactionitemId: Number(transitid),
          });
          throw new Error(
            `Failed to create booking for package ${item.id}: ${JSON.stringify(errorData?.message)}`
          );
        }

        return response2.json();
      } else {
        // For regular products, only create transaction-item
        const response = await fetch(`${API_BASE_URL}/transaction-items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            transactionId: Number(transId),
            productId: item.id,
            quantity: Number(item.quantity) || 1,
            price: formatPrice(item.price),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Failed to create transaction-item:", errorData);
          throw new Error(`Failed to create transaction-item for product ${item.id}`);
        }

        return response.json();
      }
    })
    );

    const paymentResponse = await fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        provider: paymentMethod,
        amount: parseFloat(grandTotal.toFixed(2)),
        status: "SUCCESS",
        transactionId: Number(transId),
      }),
    });

    if (!paymentResponse.ok) {
      throw new Error("Payment could not be completed.");
    }

    await paymentResponse.json();
    checkoutItems.forEach((item) => removeFromCart(item.id));

    localStorage.removeItem("checkoutItems");
    localStorage.removeItem("shippingSelection");
    alert(`Payment successful using ${paymentMethod}! Total: $${grandTotal.toFixed(2)}`);
    router.push("/ThankYou");
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-black/10 pb-6 dark:border-white/15">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-55">Unik Loh! / Payment</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Complete your payment</h1>
          <p className="mt-3 text-sm opacity-65">Review your order and select a payment method.</p>
        </header>
      {checkoutItems.length === 0 ? (
        <section className="border border-black/10 bg-black/[.03] p-10 text-center dark:border-white/15 dark:bg-white/[.04]">
          <p className="text-lg font-semibold">No items to pay for.</p>
          <p className="mt-2 text-sm opacity-60">Return to your cart to select products for checkout.</p>
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
                  <p className="mt-4 text-sm opacity-60">Quantity: {item.quantity} · Unit price: ${formatPrice(item.price)}</p>
                </div>
                <p className="col-start-2 text-left text-base font-bold sm:col-start-auto sm:text-right">${formatPrice(getPrice(item.price) * (Number(item.quantity) || 1))}</p>
              </article>
            ))}
          </section>
          <aside className="h-fit bg-black/[.04] p-6 dark:bg-white/[.07] lg:sticky lg:top-6">
            <h2 className="border-b border-black/10 pb-4 font-bold dark:border-white/15">Payment details</h2>
            <div className="border-b border-black/10 py-5 dark:border-white/15">
              <label htmlFor="payment-method" className="mb-2 block text-sm font-semibold">Payment method</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-current/25 bg-[var(--foreground)] px-3 py-2.5 text-sm text-[var(--background)] outline-none focus:border-current"
            >
              <option value="credit_card" className="bg-white text-black">Credit Card</option>
              <option value="bank_transfer" className="bg-white text-black">Bank Transfer</option>
              <option value="cod" className="bg-white text-black">Cash on Delivery</option>
              <option value="crypto" className="bg-white text-black">Cryptocurrency</option>
            </select>
            </div>
            <dl className="space-y-4 border-b border-black/10 py-5 text-sm dark:border-white/15">
              <div className="flex justify-between"><dt className="opacity-60">Subtotal</dt><dd>${total.toFixed(2)}</dd></div>
              <div className="flex justify-between">
                <dt className="opacity-60">Shipping{shippingSelection?.cost?.service ? ` (${shippingSelection.cost.name || shippingSelection.cost.code} - ${shippingSelection.cost.service})` : ""}</dt>
                <dd>{shippingSelection ? `$${shippingCost.toFixed(2)}` : "Not selected"}</dd>
              </div>
              {shippingSelection?.destination && (
                <div className="flex justify-between"><dt className="opacity-60">Deliver to</dt><dd>{shippingSelection.destination.name}</dd></div>
              )}
              {shippingSelection?.recipientName && (
                <div className="flex justify-between"><dt className="opacity-60">Recipient</dt><dd>{shippingSelection.recipientName}</dd></div>
              )}
              {shippingSelection?.postalCode && (
                <div className="flex justify-between"><dt className="opacity-60">Postal code</dt><dd>{shippingSelection.postalCode}</dd></div>
              )}
              {shippingSelection?.addressType && (
                <div className="flex justify-between"><dt className="opacity-60">Address type</dt><dd className="capitalize">{shippingSelection.addressType}</dd></div>
              )}
            </dl>
            {shippingSelection?.deliveryNotes && (
              <div className="mt-4 border border-black/10 bg-black/[.03] p-3 text-xs dark:border-white/15 dark:bg-white/[.04]">
                <p className="mb-1 font-semibold opacity-80">Delivery notes</p>
                <p className="opacity-65">{shippingSelection.deliveryNotes}</p>
              </div>
            )}
            <div className="flex justify-between py-5 text-lg font-bold"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
            <button
              onClick={handlePayment}
              className="w-full bg-black py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
              Confirm Payment
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs opacity-55">
              <Lock size={14} className="shrink-0" />
              Your payment is securely processed after confirmation.
            </p>
          </aside>
        </div>
      )}
      </div>
    </main>
  );
}