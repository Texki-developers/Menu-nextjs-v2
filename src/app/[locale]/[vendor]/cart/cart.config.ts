export interface CartItemConfig {
  id: string;
  title: string;
  extras: string;
  price: number;
  qty: number;
  image: string;
}

export interface UpsellItemConfig {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface DeliveryAddressConfig {
  label: string;
  address: string;
  deliveryTime: string;
}

export const cartItemsConfig: CartItemConfig[] = [
  {
    id: "101",
    title: "Double Cheeseburger",
    extras: "No onions, Extra cheese, Medium Rare",
    price: 45,
    qty: 2,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "102",
    title: "Truffle Parmesan Fries",
    extras: "Spicy mayo on side",
    price: 25,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const upsellItemsConfig: UpsellItemConfig[] = [
  {
    id: "201",
    title: "Coke Zero",
    price: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "202",
    title: "Choco Lava",
    price: 18,
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "203",
    title: "Garlic Bread",
    price: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "204",
    title: "Caesar Salad",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "205",
    title: "Chicken Wings",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "206",
    title: "Mozzarella Sticks",
    price: 16,
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "207",
    title: "Onion Rings",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "208",
    title: "Ice Cream",
    price: 15,
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const deliveryAddressConfig: DeliveryAddressConfig = {
  label: "WORK",
  address: "Business Bay, Office 402",
  deliveryTime: "Delivery in 25-35 mins",
};

export const deliveryFee = 12;
export const discount = 0;
