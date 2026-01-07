interface CartHeaderProps {
    tableNumber?: string;
    deliveryTime?: string;
}

const CartHeader = ({
    tableNumber = "Table 12",
    deliveryTime = "Ready in 15-20 mins",
}: CartHeaderProps) => {
    return (
        <div className="bg-white p-5 pb-6 rounded-b-3xl shadow-sm border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">Cart</h2>
                <button className="text-red-500 text-sm font-semibold hover:bg-red-50 px-2 py-1 rounded-lg transition-colors">
                    Clear
                </button>
            </div>

            {/* Table Number Card */}
            <div className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                <div className="bg-white p-2.5 rounded-full shadow-sm text-orange-600">
                    <div className="w-5 h-5 flex items-center justify-center font-bold text-orange-600">
                        #
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{tableNumber}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{deliveryTime}</p>
                </div>
                {/* <button>
                    <ChevronRight size={18} className="text-orange-300" />
                </button> */}
            </div>
        </div>
    );
};

export default CartHeader;

