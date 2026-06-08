"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Utensils, ShoppingBag } from "lucide-react";
import { BackButton } from "@/components/atoms/back-button";
import { Button } from "@/components/atoms/button";
import Price from "@/components/organisms/price/Price";
import { useCartStore } from "@/store/cart/cart.store";
import { checkout, type OrderType } from "@/lib/api/order";

interface CheckoutPageProps {
  params: Promise<{ branchId: string }>;
}

const CheckoutPage = ({ params }: CheckoutPageProps) => {
  const { branchId } = use(params);
  const router = useRouter();
  const locale = useLocale();

  const cart = useCartStore((s) => s.cart);
  const fetchCart = useCartStore((s) => s.fetch);

  const [orderType, setOrderType] = useState<OrderType>("DINE_IN");
  const [tableNumber, setTableNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    fetchCart(branchId);
  }, [branchId, fetchCart]);

  const items = cart?.items ?? [];
  const subtotal = cart?.totals.subtotal ?? 0;
  const isEmpty = items.length === 0;

  const placeOrder = async () => {
    setError(null);
    if (isEmpty) {
      setError("Your cart is empty.");
      return;
    }
    if (orderType === "DINE_IN" && !tableNumber.trim()) {
      setError("Please enter your table number.");
      return;
    }
    setPlacing(true);
    try {
      const order = await checkout(branchId, {
        order_type: orderType,
        table_number: orderType === "DINE_IN" ? tableNumber.trim() : undefined,
        customer_name: name.trim() || undefined,
        customer_phone: phone.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      await fetchCart(branchId); // resync (now empty)
      router.replace(`/${locale}/${branchId}/order/${order._id}`);
    } catch (err) {
      const message =
        err && typeof err === "object" && "body" in err
          ? ((err as { body?: { message?: string | string[] } }).body?.message ??
            "Could not place your order.")
          : "Could not place your order.";
      setError(Array.isArray(message) ? message[0] : String(message));
      setPlacing(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400";

  return (
    <div className="min-h-dvh bg-gray-50 pb-32">
      <div className="bg-white px-5 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100">
        <BackButton />
        <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="px-5 mt-5 space-y-6">
        {/* Order type */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Order type</h2>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { type: "DINE_IN" as const, label: "Dine-in", icon: Utensils },
                { type: "TAKEAWAY" as const, label: "Takeaway", icon: ShoppingBag },
              ]
            ).map(({ type, label, icon: Icon }) => {
              const active = orderType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-4 text-sm font-bold transition-colors ${
                    active
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table number (dine-in) */}
        {orderType === "DINE_IN" && (
          <div>
            <label className="text-sm font-bold text-gray-900 mb-2 block">
              Table number
            </label>
            <input
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="e.g. 12"
              inputMode="numeric"
              className={inputClass}
            />
          </div>
        )}

        {/* Customer details */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-bold text-gray-900 mb-2 block">
              Name <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 mb-2 block">
              Phone <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              inputMode="tel"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 mb-2 block">
              Notes <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests for the kitchen?"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Your order</h2>
          <div className="space-y-2">
            {items.map((line) => (
              <div
                key={line.cart_item_id}
                className="flex justify-between text-sm text-gray-600"
              >
                <span className="truncate pr-2">
                  {line.quantity}× {line.name}
                </span>
                <Price
                  price={line.line_total}
                  size="sm"
                  color="default"
                  className="items-center shrink-0"
                />
              </div>
            ))}
            <div className="border-t border-dashed border-gray-200 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <Price price={subtotal} size="xl" color="default" />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl max-w-md mx-auto">
        <Button
          onClick={placeOrder}
          disabled={placing || isEmpty}
          variant="secondary"
          fullWidth
          size="lg"
          rounded="lg"
          className="justify-between"
        >
          <span>{placing ? "Placing order…" : "Place Order"}</span>
          <Price
            price={subtotal}
            size="sm"
            color="destructive"
            className="bg-white/20 px-2 py-0.5 rounded items-center"
          />
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
