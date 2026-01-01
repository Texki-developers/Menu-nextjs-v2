export interface ProductConfig {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  currency?: string;
}

export const productsConfig: ProductConfig[] = [
  {
    id: "1",
    title: "Pasta",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "120",
    currency: "AED",
  },
  {
    id: "2",
    title: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "85",
    currency: "AED",
  },
  {
    id: "3",
    title: "Fast food",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "65",
    currency: "AED",
  },
  {
    id: "4",
    title: "Indian",
    imageUrl:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "45",
    currency: "AED",
  },
  {
    id: "5",
    title: "Coffee",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "150",
    currency: "AED",
  },
  {
    id: "6",
    title: "Pasta",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "55",
    currency: "AED",
  },
];
