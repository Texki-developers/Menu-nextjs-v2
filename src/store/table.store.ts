import { create } from "zustand";
import { findItem, type Localized, type StatusKey } from "@/lib/menu";
import { RESTAURANT, stepsFor } from "@/constants/config";
import { cartSubtotal, type CartLine } from "@/store/cart.store";

export interface OrderItem {
  name: Localized;
  q: number;
  p: number;
}

export interface Order {
  num: string;
  who: string;
  ini: string;
  color: string;
  me?: boolean;
  items: OrderItem[];
  steps: StatusKey[];
  idx: number;
  rejected?: boolean;
}

export interface Participant {
  ini: string;
  color: string;
  name: string;
  me: boolean;
}

const SEED: Order[] = [
  {
    num: "#A-1018",
    who: "Lina M.",
    ini: "LM",
    color: "#6E635B",
    items: [
      { name: { en: "Halloumi & Honey", ar: "حلوم بالعسل" }, q: 1, p: 32 },
      { name: { en: "Mint Lemonade", ar: "ليموناضة بالنعناع" }, q: 1, p: 18 },
    ],
    steps: stepsFor(false),
    idx: 3,
  },
  {
    num: "#A-1021",
    who: "Karim",
    ini: "KR",
    color: "#2F6F8F",
    items: [{ name: { en: "Lamb Kofta", ar: "كفتة لحم" }, q: 1, p: 64 }],
    steps: stepsFor(false),
    idx: 1,
  },
];

interface TableState {
  orders: Order[];
  placeOrder: (lines: CartLine[]) => void;
  bumpOrder: (num: string) => void;
  simAdvance: () => void;
}

export const useTable = create<TableState>((set) => ({
  orders: SEED,
  placeOrder: (lines) =>
    set((s) => {
      const items: OrderItem[] = lines.map((l) => {
        const it = findItem(l.id);
        return { name: it ? it.name : { en: l.id, ar: l.id }, q: l.qty, p: l.unit };
      });
      const mine = s.orders.filter((o) => o.me).length;
      const order: Order = {
        num: "#A-" + (1024 + mine * 3),
        who: "You",
        ini: "YOU",
        color: "#E8920C",
        me: true,
        items,
        steps: stepsFor(RESTAURANT.requiresWaiterConfirm),
        idx: 0,
      };
      return { orders: [order, ...s.orders] };
    }),
  bumpOrder: (num) =>
    set((s) => ({
      orders: s.orders.map((o) =>
        o.num === num ? { ...o, idx: Math.min(o.idx + 1, o.steps.length - 1) } : o,
      ),
    })),
  simAdvance: () =>
    set((s) => {
      const active =
        s.orders.find((o) => o.me && o.idx < o.steps.length - 1) ??
        s.orders.find((o) => o.idx < o.steps.length - 1);
      if (!active) return {};
      return {
        orders: s.orders.map((o) =>
          o.num === active.num ? { ...o, idx: Math.min(o.idx + 1, o.steps.length - 1) } : o,
        ),
      };
    }),
}));

/* ---- derived selectors ---- */
export function participantsOf(orders: Order[]): Participant[] {
  const seen: Record<string, boolean> = {};
  const list: Participant[] = [{ ini: "YOU", color: "#E8920C", name: "You", me: true }];
  orders.forEach((o) => {
    if (!o.me && !seen[o.ini]) {
      seen[o.ini] = true;
      list.push({ ini: o.ini, color: o.color, name: o.who, me: false });
    }
  });
  return list;
}

export interface Bill {
  sub: number;
  svc: number;
  vat: number;
  total: number;
}

export function billOf(orders: Order[]): Bill {
  const sub = orders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.p * i.q, 0), 0);
  const svc = sub * RESTAURANT.serviceRate;
  const vat = sub * RESTAURANT.vatRate;
  return { sub, svc, vat, total: sub + svc + vat };
}

export { cartSubtotal };
