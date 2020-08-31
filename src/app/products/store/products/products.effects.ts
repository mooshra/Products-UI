import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ProductsService } from '../../services';
import { ProductsStoreState } from '../products.store';
import { fetchProducts, loadProducts, loadProductsFail, loadProductsSuccess } from './products.actions';
import { selectProductsLoaded } from './products.selectors';

@Injectable()
export class ProductsEffects {
  fetchProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProducts),
      withLatestFrom(this.store.pipe(select(selectProductsLoaded))),
      switchMap(([_, loaded]) => (!loaded ? of(loadProducts()) : EMPTY))
    )
  );

  loadProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.api.getProductsList().pipe(
          map(data => loadProductsSuccess({ data })),
          catchError((error: HttpErrorResponse) => of(loadProductsFail(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: ProductsService,
    private store: Store<ProductsStoreState>
  ) {}
}
