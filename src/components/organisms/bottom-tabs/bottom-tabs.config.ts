import { FC, SVGProps } from "react";
import { HomeIcon, OffersIcon, CartIcon, AccountIcon } from "@/assets/icons";
import { ROUTES } from "@/constants/routes";
import { Languages } from "lucide-react";

export enum BottomTabId {
  HOME = "home",
  OFFERS = "offers",
  CART = "cart",
  ACCOUNT = "account",
  LANGUAGE = "language",
}

interface BottomTabClickProps {
  togglePopupStore?: () => void;
}

export interface BottomTabConfig {
  id: BottomTabId;
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  url?: string;
  onClick?: (props: BottomTabClickProps) => void;
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
  {
    id: BottomTabId.LANGUAGE,
    name: "Language",
    icon: Languages,
    onClick: ({ togglePopupStore }: BottomTabClickProps) => {
      togglePopupStore?.();
    },
  },
];
