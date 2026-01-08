import { productsConfig, ProductConfig } from "@/app/[locale]/[vendor]/(bottom-tabs-pages)/_listing/_components/products/products.config";

export const getProductBySlug = (slug: string): ProductConfig | undefined => {
  return productsConfig.find((product) => product.slug === slug);
};
