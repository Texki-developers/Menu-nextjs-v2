"use client";

import ProductCard from "./ProductCard";
import { productsConfig } from "./products.config";

const ProductListing = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {productsConfig.map((product) => (
                <ProductCard
                    key={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    currency={product.currency}
                />
            ))}
        </div>
    );
};

export default ProductListing;

