import { Action, createReducer, on } from '@ngrx/store';

import { ErrorResponse } from '../../../shared/data';
import { Product } from '../../models/product';
import { loadProducts, loadProductsFail, loadProductsSuccess } from './products.actions';

export interface ProductsState {
  data: Product[];
  loading: boolean;
  loaded: boolean;
  error: ErrorResponse;
}

export const initListState: ProductsState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

export const initialState: ProductsState = { ...initListState };

const reducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    data,
  })),
  on(loadProductsFail, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
