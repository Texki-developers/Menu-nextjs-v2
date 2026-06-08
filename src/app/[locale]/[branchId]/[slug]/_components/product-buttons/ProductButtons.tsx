"use client";

import { BackButton } from "@/components/atoms/back-button";
import { FavoriteButton } from "@/components/atoms/favorite-button";
import FavouriteToggle from "./FavouriteToggle";

interface ProductButtonsProps {
    menuItemId?: string;
}

const ProductButtons = ({ menuItemId }: ProductButtonsProps) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-2 pointer-events-none">
            <div className="container relative">
                {/* Back Button */}
                <div className="absolute top-4 left-4 z-10 pointer-events-auto">
                    <BackButton withBlur />
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 right-4 z-10 pointer-events-auto">
                    {menuItemId ? <FavouriteToggle menuItemId={menuItemId} /> : <FavoriteButton />}
                </div>
            </div>
        </div>
    );
};

export default ProductButtons;

