import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { components } from './components/';
import { containers } from './containers/';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsStoreModule } from './store/products-store.module';

@NgModule({
  declarations: [containers, components],
  imports: [
    ProductsRoutingModule,
    ProductsStoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
