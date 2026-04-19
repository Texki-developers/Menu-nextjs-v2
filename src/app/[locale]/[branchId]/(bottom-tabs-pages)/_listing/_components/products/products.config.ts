export interface SizeOption {
  id: string;
  label: string;
  price: string | number;
}

export interface ExtraOption {
  id: string;
  label: string;
  price: string | number;
}

export interface ProductConfig {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: string | number;
  originalPrice?: string | number;
  description?: string;
  rating?: number;
  isVeg?: boolean;
  isCustomizable?: boolean;
  bestseller?: boolean;
  sizes?: SizeOption[];
  extras?: ExtraOption[];
  vendorName?: string;
  deliveryTime?: string;
  images?: string[];
}

export const productsConfig: ProductConfig[] = [
  {
    id: "1",
    slug: "premium-pasta-combo",
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
    vendorName: "Burger King",
    deliveryTime: "30 mins",
    images: [
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: [
      { id: "small", label: "Small", price: 100 },
      { id: "medium", label: "Medium", price: 120 },
      { id: "large", label: "Large", price: 150 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra Cheese", price: 10 },
      { id: "extra-sauce", label: "Extra Sauce", price: 5 },
      { id: "garlic-bread", label: "Garlic Bread", price: 8 },
    ],
  },
  {
    id: "2",
    slug: "breakfast-special",
    title: "Breakfast Special",
    image:
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 85,
    description: "Start your day right with our hearty breakfast platter including eggs, toast, and fresh coffee.",
    rating: 4.2,
    isVeg: false,
    isCustomizable: true,
    vendorName: "Burger King",
    deliveryTime: "25 mins",
    images: [
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: [
      { id: "small", label: "Small", price: 75 },
      { id: "medium", label: "Medium", price: 85 },
      { id: "large", label: "Large", price: 100 },
    ],
    extras: [
      { id: "extra-eggs", label: "Extra Eggs", price: 5 },
      { id: "bacon", label: "Bacon", price: 12 },
      { id: "hash-browns", label: "Hash Browns", price: 8 },
    ],
  },
  {
    id: "3",
    slug: "fast-food-feast",
    title: "Fast Food Feast",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 65,
    originalPrice: 85,
    description: "Your favorite burgers, fries, and soft drinks combo. Quick, tasty, and satisfying.",
    rating: 4.8,
    isVeg: false,
    bestseller: true,
    vendorName: "Burger King",
    deliveryTime: "20 mins",
    images: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: [
      { id: "small", label: "Small", price: 55 },
      { id: "medium", label: "Medium", price: 65 },
      { id: "large", label: "Large", price: 80 },
    ],
    extras: [
      { id: "extra-patty", label: "Extra Patty", price: 15 },
      { id: "extra-cheese", label: "Extra Cheese", price: 10 },
      { id: "pickles", label: "Pickles", price: 3 },
      { id: "onion-rings", label: "Onion Rings", price: 12 },
    ],
  },
  {
    id: "4",
    slug: "indian-curry-delight",
    title: "Indian Curry Delight",
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 45,
    description: "Authentic Indian flavors with aromatic spices. Includes naan bread and basmati rice.",
    rating: 4.6,
    isVeg: true,
    isCustomizable: true,
    vendorName: "Burger King",
    deliveryTime: "35 mins",
    images: [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: [
      { id: "small", label: "Small", price: 40 },
      { id: "medium", label: "Medium", price: 45 },
      { id: "large", label: "Large", price: 55 },
    ],
    extras: [
      { id: "extra-naan", label: "Extra Naan", price: 5 },
      { id: "raita", label: "Raita", price: 4 },
      { id: "pickles", label: "Pickles", price: 3 },
    ],
  },
  {
    id: "5",
    slug: "coffee-dessert-combo",
    title: "Coffee & Dessert Combo",
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 150,
    description: "Premium coffee paired with our signature dessert. Perfect for an afternoon treat.",
    rating: 4.7,
    isVeg: true,
    vendorName: "Burger King",
    deliveryTime: "15 mins",
    images: [
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: [
      { id: "small", label: "Small", price: 130 },
      { id: "medium", label: "Medium", price: 150 },
      { id: "large", label: "Large", price: 180 },
    ],
    extras: [
      { id: "extra-shot", label: "Extra Shot", price: 8 },
      { id: "whipped-cream", label: "Whipped Cream", price: 5 },
      { id: "chocolate-syrup", label: "Chocolate Syrup", price: 4 },
    ],
  },
  {
    id: "6",
    slug: "classic-pasta",
    title: "Classic Pasta",
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 55,
    description: "Traditional pasta with rich tomato sauce and fresh herbs.",
    rating: 4.3,
    isVeg: true,
    isCustomizable: true,
    vendorName: "Burger King",
    deliveryTime: "25 mins",
    images: [
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: [
      { id: "small", label: "Small", price: 45 },
      { id: "medium", label: "Medium", price: 55 },
      { id: "large", label: "Large", price: 70 },
    ],
    extras: [
      { id: "extra-cheese", label: "Extra Cheese", price: 10 },
      { id: "extra-sauce", label: "Extra Sauce", price: 5 },
      { id: "garlic-bread", label: "Garlic Bread", price: 8 },
      { id: "parmesan", label: "Parmesan", price: 6 },
    ],
  },
];
