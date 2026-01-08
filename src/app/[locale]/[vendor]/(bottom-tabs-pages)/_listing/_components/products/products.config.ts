export interface ProductConfig {
  id: string;
  title: string;
  image: string;
  price: string | number;
  originalPrice?: string | number;
  description?: string;
  rating?: number;
  isVeg?: boolean;
  isCustomizable?: boolean;
  bestseller?: boolean;
}

export const productsConfig: ProductConfig[] = [
  {
    id: "1",
    title: "Premium Pasta Combo",
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 120,
    originalPrice: 180,
    description: "Delicious pasta with creamy sauce, garlic bread, and a refreshing drink.",
    rating: 4.5,
    isVeg: true,
    isCustomizable: true,
    bestseller: true,
  },
  {
    id: "2",
    title: "Breakfast Special",
    image:
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 85,
    description: "Start your day right with our hearty breakfast platter including eggs, toast, and fresh coffee.",
    rating: 4.2,
    isVeg: false,
    isCustomizable: true,
  },
  {
    id: "3",
    title: "Fast Food Feast",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 65,
    originalPrice: 85,
    description: "Your favorite burgers, fries, and soft drinks combo. Quick, tasty, and satisfying.",
    rating: 4.8,
    isVeg: false,
    bestseller: true,
  },
  {
    id: "4",
    title: "Indian Curry Delight",
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 45,
    description: "Authentic Indian flavors with aromatic spices. Includes naan bread and basmati rice.",
    rating: 4.6,
    isVeg: true,
    isCustomizable: true,
  },
  {
    id: "5",
    title: "Coffee & Dessert Combo",
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 150,
    description: "Premium coffee paired with our signature dessert. Perfect for an afternoon treat.",
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "6",
    title: "Classic Pasta",
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 55,
    description: "Traditional pasta with rich tomato sauce and fresh herbs.",
    rating: 4.3,
    isVeg: true,
    isCustomizable: true,
  },
];
