import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ProductsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
