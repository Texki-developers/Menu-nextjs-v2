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
  nameKey: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  url?: string;
  onClick?: (props: BottomTabClickProps) => void;
}

export const bottomTabsConfig: BottomTabConfig[] = [
  {
    id: BottomTabId.HOME,
    nameKey: "BottomTabs.home",
    icon: HomeIcon,
    url: ROUTES.HOME,
  },
  {
    id: BottomTabId.OFFERS,
    nameKey: "BottomTabs.offers",
    icon: OffersIcon,
    url: ROUTES.OFFERS,
  },
  {
    id: BottomTabId.CART,
    nameKey: "BottomTabs.cart",
    icon: CartIcon,
    url: ROUTES.CART,
  },
  {
    id: BottomTabId.ACCOUNT,
    nameKey: "BottomTabs.account",
    icon: AccountIcon,
    url: ROUTES.ACCOUNT,
  },
  {
    id: BottomTabId.LANGUAGE,
    nameKey: "BottomTabs.language",
    icon: Languages,
    onClick: ({ togglePopupStore }: BottomTabClickProps) => {
      togglePopupStore?.();
    },
  },
];
