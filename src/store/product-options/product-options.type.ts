export interface ProductOptionsStore {
  selectedSize: string | null;
  selectedExtras: string[];
  setSelectedSize: (sizeId: string) => void;
  toggleExtra: (extraId: string) => void;
  resetOptions: () => void;
}
