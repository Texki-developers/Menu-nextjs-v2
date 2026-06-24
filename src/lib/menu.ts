export type Locale = "en" | "ar";

export interface Localized {
  en: string;
  ar: string;
}

export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

export type BadgeKey = "Halal" | "Veg" | "Spicy" | "Nuts" | "New" | "Bestseller";
export type StatusKey =
  | "Placed"
  | "Confirmed"
  | "Preparing"
  | "Ready"
  | "Served"
  | "Rejected";

export interface MenuItem {
  id: string;
  name: Localized;
  desc: Localized;
  price: number;
  badges: BadgeKey[];
  /** has size + add-on modifiers */
  mods?: boolean;
  soldout?: boolean;
}

export interface MenuSection {
  id: string;
  cat: Localized;
  /** gradient tint pair for the photo placeholder */
  tint: [string, string];
  items: MenuItem[];
}

/* ------------------------------------------------------------------
   Badge + status meta — visual mapping lives with the data so atoms
   stay dumb and reusable.
   ------------------------------------------------------------------ */
export const BADGE_META: Record<BadgeKey, { label: Localized }> = {
  Halal: { label: { en: "🌿 Halal", ar: "🌿 حلال" } },
  Veg: { label: { en: "Veg", ar: "نباتي" } },
  Spicy: { label: { en: "Spicy", ar: "حار" } },
  Nuts: { label: { en: "Nuts", ar: "مكسرات" } },
  New: { label: { en: "New", ar: "جديد" } },
  Bestseller: { label: { en: "Bestseller", ar: "الأكثر طلباً" } },
};

export const STATUS_LABEL: Record<StatusKey, Localized> = {
  Placed: { en: "Placed", ar: "تم الطلب" },
  Confirmed: { en: "Confirmed", ar: "مؤكد" },
  Preparing: { en: "Preparing", ar: "قيد التحضير" },
  Ready: { en: "Ready", ar: "جاهز" },
  Served: { en: "Served", ar: "تم التقديم" },
  Rejected: { en: "Rejected", ar: "مرفوض" },
};

/* ------------------------------------------------------------------
   Modifiers
   ------------------------------------------------------------------ */
export interface Modifier {
  id: string;
  name: Localized;
  delta: number;
}

export const SIZES: Modifier[] = [
  { id: "reg", name: { en: "Regular", ar: "عادي" }, delta: 0 },
  { id: "lrg", name: { en: "Large", ar: "كبير" }, delta: 18 },
];

export const ADDONS: Modifier[] = [
  { id: "rice", name: { en: "Extra saffron rice", ar: "أرز زعفران إضافي" }, delta: 12 },
  { id: "veg", name: { en: "Grilled vegetables", ar: "خضار مشوية" }, delta: 14 },
  { id: "garlic", name: { en: "Garlic sauce", ar: "صلصة الثوم" }, delta: 4 },
  { id: "zhoug", name: { en: "Spicy zhoug", ar: "زهوق حار" }, delta: 6 },
];

/* ------------------------------------------------------------------
   Menu
   ------------------------------------------------------------------ */
export const MENU: MenuSection[] = [
  {
    id: "mezze",
    cat: { en: "Mezze", ar: "المقبلات" },
    tint: ["#F3E7D2", "#EAD9BE"],
    items: [
      {
        id: "muhammara",
        name: { en: "Muhammara", ar: "محمرة" },
        desc: { en: "Roasted pepper & walnut, pomegranate molasses", ar: "فلفل محمص وجوز، دبس الرمان" },
        price: 28,
        badges: ["Veg", "Spicy", "Nuts"],
      },
      {
        id: "hummus",
        name: { en: "Hummus Beiruti", ar: "حمص بيروتي" },
        desc: { en: "Chickpea, tahini, garlic, parsley oil", ar: "حمص، طحينة، ثوم، زيت البقدونس" },
        price: 24,
        badges: ["Veg", "Halal"],
      },
      {
        id: "halloumi",
        name: { en: "Halloumi & Honey", ar: "حلوم بالعسل" },
        desc: { en: "Grilled halloumi, saffron honey, dukkah", ar: "حلوم مشوي، عسل الزعفران، الدُقّة" },
        price: 32,
        badges: ["Veg", "New"],
      },
    ],
  },
  {
    id: "grills",
    cat: { en: "Grills", ar: "المشاوي" },
    tint: ["#EFD9C0", "#E6C6A2"],
    items: [
      {
        id: "shish",
        name: { en: "Saffron Chicken Shish", ar: "شيش دجاج بالزعفران" },
        desc: { en: "Yoghurt-marinated, charcoal-grilled, sumac", ar: "متبّل باللبن، مشوي على الفحم، سُمّاق" },
        price: 58,
        badges: ["Halal", "Bestseller"],
        mods: true,
      },
      {
        id: "kofta",
        name: { en: "Lamb Kofta", ar: "كفتة لحم" },
        desc: { en: "Twice-minced lamb, sumac onions, tahini", ar: "لحم مفروم، بصل بالسماق، طحينة" },
        price: 64,
        badges: ["Halal", "Spicy"],
        mods: true,
      },
      {
        id: "mixed",
        name: { en: "Mixed Grill", ar: "مشاوي مشكلة" },
        desc: { en: "Kofta, shish, lamb chop, wings — to share", ar: "كفتة، شيش، ريش غنم، أجنحة — للمشاركة" },
        price: 120,
        badges: ["Halal", "Bestseller"],
      },
    ],
  },
  {
    id: "mains",
    cat: { en: "Mains", ar: "الأطباق" },
    tint: ["#EBDDC6", "#DECBAC"],
    items: [
      {
        id: "mansaf",
        name: { en: "Mansaf", ar: "منسف" },
        desc: { en: "Slow lamb, jameed yoghurt, saffron rice", ar: "لحم غنم، لبن جميد، أرز بالزعفران" },
        price: 78,
        badges: ["Halal"],
      },
      {
        id: "sayadieh",
        name: { en: "Sayadieh", ar: "صيادية" },
        desc: { en: "Spiced fish, caramelised onion rice", ar: "سمك متبل، أرز بالبصل المكرمل" },
        price: 72,
        badges: ["Halal", "Nuts"],
        soldout: true,
      },
    ],
  },
  {
    id: "sides",
    cat: { en: "Sides", ar: "الإضافات" },
    tint: ["#EEE6D2", "#E2D6BC"],
    items: [
      {
        id: "rice",
        name: { en: "Saffron Rice", ar: "أرز بالزعفران" },
        desc: { en: "Basmati, saffron, toasted almonds", ar: "بسمتي، زعفران، لوز محمص" },
        price: 16,
        badges: ["Veg", "Halal"],
      },
      {
        id: "fattoush",
        name: { en: "Fattoush", ar: "فتوش" },
        desc: { en: "Garden greens, sumac, crisp khubz", ar: "خضار، سماق، خبز مقرمش" },
        price: 22,
        badges: ["Veg", "Halal"],
      },
    ],
  },
  {
    id: "desserts",
    cat: { en: "Desserts", ar: "الحلويات" },
    tint: ["#F0E2CE", "#E7D2B4"],
    items: [
      {
        id: "knafeh",
        name: { en: "Knafeh", ar: "كنافة" },
        desc: { en: "Cheese, kataifi, orange-blossom syrup", ar: "جبن، كنافة، شراب ماء الزهر" },
        price: 34,
        badges: ["Veg", "Nuts", "Bestseller"],
      },
      {
        id: "creme",
        name: { en: "Saffron Crème", ar: "كريمة الزعفران" },
        desc: { en: "Set cream, saffron, pistachio", ar: "كريمة، زعفران، فستق" },
        price: 28,
        badges: ["Veg", "Nuts"],
      },
    ],
  },
  {
    id: "drinks",
    cat: { en: "Drinks", ar: "المشروبات" },
    tint: ["#EAE0CB", "#DCCEAE"],
    items: [
      {
        id: "lemonade",
        name: { en: "Mint Lemonade", ar: "ليموناضة بالنعناع" },
        desc: { en: "Lemon, fresh mint, lightly sweet", ar: "ليمون، نعناع طازج، خفيف الحلاوة" },
        price: 18,
        badges: ["Veg"],
      },
      {
        id: "jallab",
        name: { en: "Jallab", ar: "جلاب" },
        desc: { en: "Date molasses, rose water, pine nuts", ar: "دبس التمر، ماء الورد، صنوبر" },
        price: 20,
        badges: ["Veg", "Nuts"],
      },
    ],
  },
];

export interface FlatItem extends MenuItem {
  cat: Localized;
  tint: [string, string];
}

export function flatItems(): FlatItem[] {
  return MENU.flatMap((s) => s.items.map((i) => ({ ...i, cat: s.cat, tint: s.tint })));
}

export function findItem(id: string): FlatItem | undefined {
  return flatItems().find((i) => i.id === id);
}

export const CHEF_PICK_IDS = ["shish", "knafeh", "halloumi"];
export const RECENT_SEARCHES: Localized[] = [
  { en: "Saffron", ar: "زعفران" },
  { en: "Knafeh", ar: "كنافة" },
  { en: "Lamb", ar: "لحم" },
  { en: "Mint", ar: "نعناع" },
];
