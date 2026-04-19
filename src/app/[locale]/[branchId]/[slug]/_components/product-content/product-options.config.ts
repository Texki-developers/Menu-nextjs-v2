export interface SizeOption {
  id: string;
  label: string;
  price: string | number;
}

export interface ExtraOption {
  id: string;
  label: string;
  price: string | number;
}

export const sizeOptions: SizeOption[] = [
  {
    id: "small",
    label: "Small",
    price: "100",
  },
  {
    id: "medium",
    label: "Medium",
    price: "150",
  },
  {
    id: "large",
    label: "Large",
    price: "200",
  },
];

export const extraOptions: ExtraOption[] = [
  {
    id: "extra-cheese",
    label: "Extra Cheese",
    price: "10",
  },
  {
    id: "extra-sauce",
    label: "Extra Sauce",
    price: "5",
  },
  {
    id: "bacon",
    label: "Bacon",
    price: "15",
  },
  {
    id: "pickles",
    label: "Pickles",
    price: "3",
  },
];
