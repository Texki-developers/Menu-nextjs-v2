"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Utensils, ShoppingBag } from "lucide-react";
import { Button } from "@/components/atoms/button";
import Price from "@/components/organisms/price/Price";
import { getOrder } from "@/lib/api/order";

interface OrderPageProps {
  params: Promise<{ branchId: string; orderId: string }>;
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Order placed",
  PREPARING: "Being prepared",
  READY: "Ready",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const OrderConfirmationPage = ({ params }: OrderPageProps) => {
  const { branchId, orderId } = use(params);
  const router = useRouter();
  const locale = useLocale();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order", branchId, orderId],
    queryFn: () => getOrder(branchId, orderId),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading your order…</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-sm text-gray-500">We couldn&apos;t find this order.</p>
        <Button
          onClick={() => router.replace(`/${locale}/${branchId}`)}
          variant="secondary"
          size="lg"
          rounded="lg"
        >
          Back to menu
        </Button>
      </div>
    );
  }

  const TypeIcon = order.order_type === "TAKEAWAY" ? ShoppingBag : Utensils;
  const shortRef = order.order_uuid.replace(/^order_/, "").slice(0, 8).toUpperCase();

  return (
    <div className="min-h-dvh bg-gray-50 pb-32">
      <div className="flex flex-col items-center text-center px-6 pt-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle2 size={44} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Order placed!</h1>
        <p className="text-sm text-gray-500 mt-2">
          {STATUS_LABEL[order.status] ?? order.status} · Ref #{shortRef}
        </p>
      </div>

      <div className="px-5 mt-8 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <TypeIcon size={18} />
            <span className="font-bold text-sm">
              {order.order_type === "TAKEAWAY" ? "Takeaway" : "Dine-in"}
            </span>
            {order.order_type === "DINE_IN" && order.table_number && (
              <span className="text-sm text-gray-500">· Table {order.table_number}</span>
            )}
          </div>
          {order.customer_name && (
            <div className="text-sm text-gray-500">Name: {order.customer_name}</div>
          )}
          {order.notes && (
            <div className="text-sm text-gray-500">Notes: {order.notes}</div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Items</h2>
          <div className="space-y-2">
            {order.items.map((line) => (
              <div
                key={line.menu_item_id + line.name}
                className="flex justify-between text-sm text-gray-600"
              >
                <span className="truncate pr-2">
                  {line.quantity}× {line.name}
                </span>
                <Price
                  price={line.total_price}
                  size="sm"
                  color="default"
                  className="items-center shrink-0"
                />
              </div>
            ))}
            <div className="border-t border-dashed border-gray-200 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <Price price={order.total_amount} size="xl" color="default" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 z-50 rounded-t-3xl max-w-md mx-auto">
        <Button
          onClick={() => router.replace(`/${locale}/${branchId}`)}
          variant="secondary"
          fullWidth
          size="lg"
          rounded="lg"
        >
          Back to menu
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
