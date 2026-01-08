export interface HeroBannerConfig {
  id: string;
  image: string;
  badge: string;
  discount: string;
  title: string;
  description: string;
}

export const heroBannerConfig: HeroBannerConfig[] = [
  {
    id: "1",
    image:
      "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Limited Time",
    discount: "50% OFF",
    title: "On All Pasta Dishes",
    description: "Craving authentic Italian? Order now and get half price on our chef's specials.",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Morning Special",
    discount: "30% OFF",
    title: "On Breakfast Items",
    description: "Start your day right with our hearty breakfast platter. Fresh, delicious, and now at a special price.",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Hot Deal",
    discount: "25% OFF",
    title: "On Fast Food Combo",
    description: "Your favorite burgers, fries, and soft drinks combo. Quick, tasty, and satisfying.",
  },
];
