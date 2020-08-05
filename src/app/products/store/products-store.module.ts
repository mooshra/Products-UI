import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FEATURE_KEY, reducers } from './products.store';
import { effects } from '.';

@NgModule({
    imports: [StoreModule.forFeature(FEATURE_KEY, reducers), EffectsModule.forFeature(effects)],
  })
export class ProductsStoreModule {}
