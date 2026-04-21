import {
    UtensilsCrossed,
    Pizza,
    Coffee,
    Beer,
    IceCream,
    HelpCircle,
    type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
    UtensilsCrossed,
    Pizza,
    Coffee,
    Beer,
    IceCream,
};

export const getCategoryIcon = (name?: string): LucideIcon => {
    if (!name) return HelpCircle;
    return CATEGORY_ICON_MAP[name] ?? HelpCircle;
};
