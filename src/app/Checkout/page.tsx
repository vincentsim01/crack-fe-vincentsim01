"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Package, Truck } from "lucide-react";
import { api, ShippingDestination, ShippingCostOption } from "@/lib/api/api";
import { getCookie } from "@/lib/auth/auth";

type Product = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  image?: string;
  description?: string;
};

const WEIGHT_PER_ITEM_GRAMS = 1000;

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  // const [isPhotoShootAdded, setIsPhotoShootAdded] = useState<boolean>(false);

  const [recipientName, setRecipientName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressType, setAddressType] = useState<"home" | "office">("home");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState<ShippingDestination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<ShippingDestination | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [costOptions, setCostOptions] = useState<ShippingCostOption[]>([]);
  const [selectedCost, setSelectedCost] = useState<ShippingCostOption | null>(null);
  const [isCalculatingCost, setIsCalculatingCost] = useState(false);
  const [costError, setCostError] = useState<string | null>(null);

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

  // Debounced destination search
  useEffect(() => {
    if (search.trim().length < 3) {
      setDestinations([]);
      return;
    }
    const authToken = getCookie("auth-token") || undefined;
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);
      try {
        const results = await api.searchShippingDestinations(search.trim(), authToken);
        setDestinations(results);
      } catch (error) {
        console.error("Error searching destinations", error);
        setSearchError("Failed to search destinations. Please try again.");
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const selectDestination = (destination: ShippingDestination) => {
    setSelectedDestination(destination);
    setDestinations([]);
    setSearch(destination.name);
    setCostOptions([]);
    setSelectedCost(null);
    setCostError(null);
  };

  const isAddressComplete = recipientName.trim().length > 0 && postalCode.trim().length > 0 && !!selectedDestination;

  const handleGetShippingCost = async () => {
    if (!isAddressComplete || !selectedDestination) return;
    const authToken = getCookie("auth-token") || undefined;
    const weight = checkoutItems.reduce(
      (sum, item) => sum + (item.quantity || 1) * WEIGHT_PER_ITEM_GRAMS,
      0
    ) || WEIGHT_PER_ITEM_GRAMS;

    setIsCalculatingCost(true);
    setCostError(null);
    setSelectedCost(null);
    try {
      const options = await api.calculateShippingCost(
        { destinationId: selectedDestination.id, weight },
        authToken
      );
      setCostOptions(options);
    } catch (error) {
      console.error("Error calculating shipping cost", error);
      setCostError("Failed to calculate shipping cost. Please try again.");
    } finally {
      setIsCalculatingCost(false);
    }
  };

  const handleSelectCost = (option: ShippingCostOption) => {
    setSelectedCost(option);
  };

  const handleProceedToPayment = () => {
    if (selectedDestination && selectedCost) {
      localStorage.setItem(
        "shippingSelection",
        JSON.stringify({
          recipientName: recipientName.trim(),
          postalCode: postalCode.trim(),
          addressType,
          deliveryNotes: deliveryNotes.trim(),
          destination: selectedDestination,
          cost: selectedCost,
        })
      );
    }
    router.push("/Payment");
  };

  const shippingCost = selectedCost?.cost || 0;
  const grandTotal = total + shippingCost;

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
            <div className="mb-2 flex items-center gap-2 border-b border-black/10 pb-4 dark:border-white/15">
              <Truck size={20} className="opacity-70" />
              <h2 className="font-bold">Shipping address</h2>
            </div>
            <div className="space-y-4 border-b border-black/10 py-5 dark:border-white/15">
              <div>
                <label htmlFor="recipient-name" className="mb-2 block text-sm font-semibold">Recipient name</label>
                <input
                  id="recipient-name"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border border-current/25 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-current"
                />
              </div>
              <div>
                <label htmlFor="postal-code" className="mb-2 block text-sm font-semibold">Postal code</label>
                <input
                  id="postal-code"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 11530"
                  className="w-full border border-current/25 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-current"
                />
              </div>
              <div>
                <label htmlFor="address-type" className="mb-2 block text-sm font-semibold">Address type</label>
                <select
                  id="address-type"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value as "home" | "office")}
                  className="w-full border border-current/25 bg-[var(--foreground)] px-3 py-2.5 text-sm text-[var(--background)] outline-none focus:border-current"
                >
                  <option value="home" className="bg-white text-black">Home</option>
                  <option value="office" className="bg-white text-black">Office</option>
                </select>
              </div>
              <div>
                <label htmlFor="delivery-notes" className="mb-2 block text-sm font-semibold">Delivery notes (optional)</label>
                <textarea
                  id="delivery-notes"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Leave with the security guard"
                  rows={2}
                  className="w-full resize-none border border-current/25 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-current"
                />
              </div>
              {!isAddressComplete && (
                <p className="text-xs text-red-500">Fill in recipient name, postal code, and select a destination to continue.</p>
              )}
            </div>
            <div className="relative border-b border-black/10 py-5 dark:border-white/15">
              <label htmlFor="destination-search" className="mb-2 block text-sm font-semibold">Search destination</label>
              <input
                id="destination-search"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedDestination(null);
                }}
                placeholder="e.g. Kebon Jeruk, Jakarta Barat"
                className="w-full border border-current/25 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-current"
              />
              {isSearching && <p className="mt-2 text-xs opacity-60">Searching...</p>}
              {searchError && <p className="mt-2 text-xs text-red-500">{searchError}</p>}
              {destinations.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto border border-current/25 bg-[var(--background)] text-sm shadow-lg">
                  {destinations.map((destination) => (
                    <li key={destination.id}>
                      <button
                        type="button"
                        onClick={() => selectDestination(destination)}
                        className="block w-full px-3 py-2 text-left hover:bg-black/10 dark:hover:bg-white/10"
                      >
                        {destination.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {selectedDestination && (
                <p className="mt-2 text-xs opacity-70">Selected: {selectedDestination.name}</p>
              )}
              <button
                type="button"
                onClick={handleGetShippingCost}
                disabled={!isAddressComplete || isCalculatingCost}
                className="mt-4 w-full border border-current/25 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-white/10"
              >
                {isCalculatingCost ? "Calculating..." : "Get shipping cost"}
              </button>
              {costError && <p className="mt-2 text-xs text-red-500">{costError}</p>}
              {costOptions.length > 0 && (
                <div className="mt-4 space-y-2">
                  {costOptions.map((option, index) => (
                    <label
                      key={`${option.code ?? option.name}-${option.service ?? index}`}
                      className={`flex cursor-pointer items-center justify-between gap-3 border px-3 py-2.5 text-sm ${
                        selectedCost === option ? "border-black dark:border-white" : "border-current/20"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping-option"
                          checked={selectedCost === option}
                          onChange={() => handleSelectCost(option)}
                        />
                        <span>
                          {(option.name || option.code || "Courier")}
                          {option.service ? ` - ${option.service}` : ""}
                          {option.etd ? ` (${option.etd} day${option.etd === "1" ? "" : "s"})` : ""}
                        </span>
                      </span>
                      <span className="font-semibold">${Number(option.cost).toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-2 flex items-center gap-2 border-b border-black/10 py-4 dark:border-white/15">
              <Package size={20} className="opacity-70" />
              <h2 className="font-bold">Order summary</h2>
            </div>
            <dl className="space-y-4 border-b border-black/10 py-5 text-sm dark:border-white/15">
              <div className="flex justify-between"><dt className="opacity-60">Subtotal</dt><dd>${total.toFixed(2)}</dd></div>
              <div className="flex justify-between">
                <dt className="opacity-60">Shipping</dt>
                <dd>{selectedCost ? `$${shippingCost.toFixed(2)}` : "Not selected"}</dd>
              </div>
            </dl>
            <div className="flex justify-between py-5 text-lg font-bold"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
            <button
              onClick={handleProceedToPayment}
              disabled={!selectedCost}
              className="w-full bg-black py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
              Proceed to payment
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-55">
              <Lock size={14} className="shrink-0" />
              {selectedCost ? "You will review your payment details on the next page." : "Select a shipping option to continue."}
            </div>
          </aside>
        </div>
      )}
      </div>
    </main>
  );
}