import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { AppState } from '..';

export const selectRouter = createFeatureSelector<AppState, fromRouter.RouterReducerState<any>>(
  'router'
);

export const {
  selectCurrentRoute,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
} = fromRouter.getSelectors(selectRouter);
