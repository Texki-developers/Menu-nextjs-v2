import { apiFetch } from "./client";
import { getCartToken } from "@/lib/cart/token";

export type OrderType = "DINE_IN" | "TAKEAWAY";

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderItemLine {
  menu_item_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  _id: string;
  order_uuid: string;
  branch_id: string;
  organization_id: string;
  items: OrderItemLine[];
  total_amount: number;
  status: OrderStatus;
  order_type: OrderType;
  table_number?: string;
  customer_name?: string;
  customer_phone?: string;
  notes?: string;
  created_at: string;
}

export interface CheckoutPayload {
  order_type: OrderType;
  table_number?: string;
  customer_name?: string;
  customer_phone?: string;
  notes?: string;
}

export async function checkout(
  branchId: string,
  payload: CheckoutPayload,
): Promise<Order> {
  return apiFetch<Order>(`/public/branches/${branchId}/checkout`, {
    method: "POST",
    body: payload,
    headers: { "x-cart-token": getCartToken() },
  });
}

export async function getOrder(
  branchId: string,
  orderId: string,
): Promise<Order> {
  return apiFetch<Order>(`/public/branches/${branchId}/orders/${orderId}`, {
    cache: "no-store",
  });
}
