import { Product } from '../../products/models/product';

export function getProductsJson() {
  return JSON.parse(localStorage.getItem('products'));
}

export function setProductsJson(products: Product[]): void {
  localStorage.setItem('products', JSON.stringify(products));
}
