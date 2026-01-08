import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
    return (
        <div className="text-center py-10 opacity-50">
            <ShoppingBag size={48} className="mx-auto mb-3" />
            <p>Your cart is empty</p>
        </div>
    );
};

export default EmptyCart;

