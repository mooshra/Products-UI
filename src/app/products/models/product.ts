export interface Product {
  productId: number;
  name: string;
  category: string;
  price: number;
}

export const initialProducts: Product[] = [
  {
    productId: 1,
    name: 'test 1',
    price: 100,
    category: 'category',
  },
  {
    productId: 2,
    name: 'test 2',
    price: 111,
    category: 'category',
  },
];
