import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { containers } from './containers/';
import { components } from './components/';

@NgModule({
  declarations: [containers, components],
  imports: [ProductsRoutingModule],
})
export class ProductsModule { }
