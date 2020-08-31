import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { productsReducer, ProductsState } from './products/products.reducers';

export interface ProductsStoreState {
  products: ProductsState;
}

export const reducers: ActionReducerMap<ProductsStoreState> = {
  products: productsReducer,
};

export const FEATURE_KEY = 'products';

export const getProductsStoreState = createFeatureSelector<ProductsStoreState>(FEATURE_KEY);
