import { FC, SVGProps } from "react";
import { HomeIcon, OffersIcon, CartIcon, AccountIcon } from "@/assets/icons";

export enum BottomTabId {
  HOME = "home",
  OFFERS = "offers",
  CART = "cart",
  ACCOUNT = "account",
}

export interface BottomTabConfig {
  id: BottomTabId;
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const bottomTabsConfig: BottomTabConfig[] = [
  {
    id: BottomTabId.HOME,
    name: "Home",
    icon: HomeIcon,
  },
  {
    id: BottomTabId.OFFERS,
    name: "Offers",
    icon: OffersIcon,
  },
  {
    id: BottomTabId.CART,
    name: "Cart",
    icon: CartIcon,
  },
  {
    id: BottomTabId.ACCOUNT,
    name: "Account",
    icon: AccountIcon,
  },
];
