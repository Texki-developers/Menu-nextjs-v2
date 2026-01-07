"use client";

import ProductCard from "./ProductCard";
import { productsConfig } from "./products.config";

const ProductListing = () => {
    return (
        <div className="flex flex-col gap-4">
            {productsConfig.map((product) => (
                <ProductCard key={product.id} item={product} />
            ))}
        </div>
    );
};

export default ProductListing;

