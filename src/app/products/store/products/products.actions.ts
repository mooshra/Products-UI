import { createAction, props } from '@ngrx/store';

import { ErrorResponse } from '../../../shared/data';
import { Product } from '../../models/product';

export enum ProductsActionTypes {
  FETCH = '[Lists] Fetch Products',
  LOAD = '[Lists] Load Products',
  LOAD_SUCCESS = '[Lists] Load Products Success',
  LOAD_FAIL = '[Lists] Load Products Fail',
  OPEN_DIALOG = '[Lists] Open Products Dialog',
  CLOSE_DIALOG = '[Lists] Close Products Dialog',
}

export const fetchProducts = createAction(ProductsActionTypes.FETCH);
export const loadProducts = createAction(ProductsActionTypes.LOAD);
export const loadProductsSuccess = createAction(
  ProductsActionTypes.LOAD_SUCCESS,
  props<{ data: Product[] }>()
);
export const loadProductsFail = createAction(
  ProductsActionTypes.LOAD_FAIL,
  props<{ error: ErrorResponse }>()
);
