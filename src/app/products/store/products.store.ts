import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProductsStoreState {
  products: any;
  // ProductsState;
}

export const reducers: ActionReducerMap<ProductsStoreState> = {
    products: null
    // productsReducer
};

export const FEATURE_KEY = 'products';

export const getProductsStoreState = createFeatureSelector<ProductsStoreState>(FEATURE_KEY);
