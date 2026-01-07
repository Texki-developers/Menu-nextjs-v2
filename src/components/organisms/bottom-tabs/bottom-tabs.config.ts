import { FC, SVGProps } from "react";
import { HomeIcon, OffersIcon, CartIcon, AccountIcon } from "@/assets/icons";
import { ROUTES } from "@/constants/routes";

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
  url: string;
}

export const bottomTabsConfig: BottomTabConfig[] = [
  {
    id: BottomTabId.HOME,
    name: "Home",
    icon: HomeIcon,
    url: ROUTES.HOME,
  },
  {
    id: BottomTabId.OFFERS,
    name: "Offers",
    icon: OffersIcon,
    url: ROUTES.OFFERS,
  },
  {
    id: BottomTabId.CART,
    name: "Cart",
    icon: CartIcon,
    url: ROUTES.CART,
  },
  {
    id: BottomTabId.ACCOUNT,
    name: "Account",
    icon: AccountIcon,
    url: ROUTES.ACCOUNT,
  },
];
