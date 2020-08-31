import { createSelector } from '@ngrx/store';

import { getProductsStoreState, ProductsStoreState } from '../products.store';
import { ProductsState } from './products.reducers';

export const selectProductsState = createSelector(
  getProductsStoreState,
  (state: ProductsStoreState) => state.products
);

export const selectProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.data
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);
