import { NgModule } from '@angular/core';

import { components } from './components/';
import { containers } from './containers/';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [containers, components],
  imports: [ProductsRoutingModule],
})
export class ProductsModule {}
