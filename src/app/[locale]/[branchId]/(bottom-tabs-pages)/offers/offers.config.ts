export interface OfferConfig {
  id: string;
  image: string;
  title: string;
  discount: string;
  description: string;
  originalPrice: string | number;
  price: string | number;
  btnColor: string;
  isHighlighted?: boolean;
  aiReason?: string;
}

export const offersConfig: OfferConfig[] = [
  {
    id: "1",
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Premium Pasta Combo",
    discount: "50% OFF",
    description: "Delicious pasta with creamy sauce, garlic bread, and a refreshing drink. Perfect for a family dinner.",
    originalPrice: "240",
    price: "120",
    btnColor: "bg-orange-500",
    isHighlighted: true,
    aiReason: "Best value for family meals - saves you 50%",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Breakfast Special",
    discount: "30% OFF",
    description: "Start your day right with our hearty breakfast platter including eggs, toast, and fresh coffee.",
    originalPrice: "120",
    price: "84",
    btnColor: "bg-orange-500",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Fast Food Feast",
    discount: "25% OFF",
    description: "Your favorite burgers, fries, and soft drinks combo. Quick, tasty, and satisfying.",
    originalPrice: "85",
    price: "64",
    btnColor: "bg-orange-500",
    isHighlighted: true,
    aiReason: "Popular choice - ordered 200+ times this week",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Indian Curry Delight",
    discount: "40% OFF",
    description: "Authentic Indian flavors with aromatic spices. Includes naan bread and basmati rice.",
    originalPrice: "75",
    price: "45",
    btnColor: "bg-orange-500",
  },
  {
    id: "5",
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coffee & Dessert Combo",
    discount: "35% OFF",
    description: "Premium coffee paired with our signature dessert. Perfect for an afternoon treat.",
    originalPrice: "230",
    price: "150",
    btnColor: "bg-orange-500",
  },
];
