import CartHeader from "./_components/cart-header/CartHeader";
import CartItem from "./_components/cart-item/CartItem";
import EmptyCart from "./_components/empty-cart/EmptyCart";
import UpsellSection from "./_components/upsell-section/UpsellSection";
import BillSummary from "./_components/bill-summary/BillSummary";
import CheckoutFooter from "./_components/checkout-footer/CheckoutFooter";
import {
    cartItemsConfig,
    upsellItemsConfig,
    deliveryFee,
    discount,
} from "./cart.config";

const Cart = () => {
    // Calculate totals from config (static for design)
    const subtotal = cartItemsConfig.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    const total = subtotal + deliveryFee - discount;

    return (
        <div className="pb-35 animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Cart Header - Table Number */}
            <CartHeader />

            {/* Cart Items List */}
            <div className="px-5 mt-6 space-y-5">
                {cartItemsConfig.length === 0 ? (
                    <EmptyCart />
                ) : (
                    cartItemsConfig.map((item) => <CartItem key={item.id} item={item} />)
                )}
            </div>

            {/* Upsell / Cross-sell Carousel */}
            {cartItemsConfig.length > 0 && (
                <UpsellSection items={upsellItemsConfig} />
            )}

            {/* Bill Summary */}
            {cartItemsConfig.length > 0 && (
                <BillSummary
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    discount={discount}
                    total={total}
                    distance="2.5km"
                />
            )}

            {/* Sticky Footer Checkout */}
            {cartItemsConfig.length > 0 && (
                <CheckoutFooter total={total} />
            )}
        </div>
    );
};

export default Cart;
